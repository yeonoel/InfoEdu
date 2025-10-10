import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dto/signupDto';
import { MaillerService } from 'src/mailler/mailler.service';
import { SigninDto } from './dto/signinDto';
import * as speakeasy from 'speakeasy';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ResetPasswordDemandDto } from './dto/resetPasswordDemanDto';
import { ResetPasswordConfirmation } from './dto/resetPasswordConfirmation';
import { IsBase32 } from 'class-validator';

@Injectable()
export class AuthService {
    constructor (
        private readonly prismaService: PrismaService,
        private readonly maillerService: MaillerService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    async signup(signupDto: SignupDto) {
        // ** verifier si l'utilisateur existe déja
        const {email, password, name, role} = signupDto;
        const user = await this.prismaService.user.findUnique({where: {email}});
        if(user) throw new ConflictException("User alredy existe");
        // ** hasher le mot de passe
        const hash = await bcrypt.hash(password, 10);
        // Enregistrer l'utilisateru dans la base de donnée
        await this.prismaService.user.create({ data : {name, email, password:hash, role}})
        //** Envoi du mail d'inscription au client
        this.maillerService.sendSignupConfirmation(email);
        return {date: "User succesfuly created"}

    }

    async signin(signinDto: SigninDto) {
        const {email, password} = signinDto;
        // ** Vérifier si l'utilisateur existe
        const user = await this.prismaService.user.findUnique({where: {email}});
        if(!user) throw new NotFoundException("user not found");
        // ** Comparer les mots de passe
        const match = await bcrypt.compare(password, user.password);
        if(!match) throw new UnauthorizedException("Password does not existe");
        // ** retourner le token jwt
        const payload = {
            sub:  user.id,
            email: user.email
        }
        const token = this.jwtService.sign(
            payload,
            {expiresIn: "2h", secret: this.configService.get('SECRET_KEY')}
        );

        return {
            token,
            user: {
                name: user.name,
                email: user.email
            }
        }
    }

    async resetPassword(resetPasswordDemandDto: ResetPasswordDemandDto) {
        const {email} = resetPasswordDemandDto;
        // ** Vérifier si l'utilisateur existe
        const user = await this.prismaService.user.findUnique({where: {email}});
        if(!user) throw new NotFoundException("user not found");
        // ** code a envoyer par mail au client pour la réinitialisation
        const code = speakeasy.totp( {
            secret: this.configService.get("OTP_CODE"),
            digits: 5,
            step: 60 * 15,
            encoding: "base32"
        })
        const url = "http://localhost:3000/auth/password-rest-confirmation"
        await this.maillerService.sendResetPassword(email, url, code);
        return {
            data: "Reset password has been sent"
        }
    }

    async resetPasswordConfirmation(resetPasswordConfirmation: ResetPasswordConfirmation) {
        const {email, password, code} = resetPasswordConfirmation;
        // ** Vérifier si l'utilisateur existe
        const user = await this.prismaService.user.findUnique({where: {email}});
        if(!user) throw new NotFoundException("user not found");
        const match = speakeasy.totp.verify({
            secret: this.configService.get('OTP_CODE'),
            token: code,
            digits: 5,
            step: 60 * 15,
            encoding: 'base32'
        });
        if(!match) throw new UnauthorizedException('Invalide/token expiré');
        const hash = await bcrypt.hash(password, 10);
        await this.prismaService.user.update({ where: {email}, data: {password: hash}});

        return {
            user
        }
    }
}
