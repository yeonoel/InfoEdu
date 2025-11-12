import { IsEmail, IsNotEmpty } from "class-validator";

export class SigninDto {
  @IsNotEmpty()
  readonly emailOrUsername: string;
  @IsNotEmpty()
  readonly password: string;
}
