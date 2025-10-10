import { IsEmail, IsNotEmpty} from 'class-validator';

export class ResetPasswordConfirmation {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
    @IsNotEmpty()
    readonly password: string;
    readonly code: string;
}