import { Body, Controller, Delete, Get, Post, UseGuards, Req } from '@nestjs/common';
import { SignupDto } from './dto/signupDto';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signinDto';
import { ResetPasswordDemandDto } from './dto/resetPasswordDemanDto';
import { ResetPasswordConfirmation } from './dto/resetPasswordConfirmation';
import { AuthGuard} from '@nestjs/passport';
import type { Request } from 'express';
import { deleteAccountDto } from './dto/deleteAccountDto';

@Controller('auth')
export class AuthController {
    constructor ( 
        private readonly authService: AuthService
    ) {}

    @Post('signup')
    signup(@Body() signupDto: SignupDto) {
        return this.authService.signup(signupDto);
    }

    @Post('signin')
    signin(@Body() signinDto: SigninDto) {
        return this.authService.signin(signinDto);
    }

    @Post('reset-password')
    resetPassword(@Body() resetPasswordDemandDto: ResetPasswordDemandDto) {
        return this.authService.resetPassword(resetPasswordDemandDto);
    }

    @Post('reset-password-confirmation')
    resetPasswordConfirmation(@Body() resetPasswordConfirmation: ResetPasswordConfirmation) {
        return this.authService.resetPasswordConfirmation(resetPasswordConfirmation);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('delete')
    deleteAccount(@Req() request: Request, @Body() deleteAccountDto: deleteAccountDto) {
        const userId =  request.user!["id"];
        return this.authService.deleteAccount(userId, deleteAccountDto);
    }
}
