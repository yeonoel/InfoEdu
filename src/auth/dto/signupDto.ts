import { IsString, IsEmail, IsNotEmpty } from "class-validator";

export class SignupDto {
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  readonly password: string;
  readonly role: string;
}
