import { Body, Controller, Get, Post } from '@nestjs/common';
import { SignupDto } from './dto/signupDto';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signinDto';
import { ResetPasswordDemandDto } from './dto/resetPasswordDemanDto';
import { ResetPasswordConfirmation } from './dto/resetPasswordConfirmation';

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
}
