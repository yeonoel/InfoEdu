import { IsString } from "class-validator";

export class CreateImagesDto {
  @IsString()
  url: string;
}