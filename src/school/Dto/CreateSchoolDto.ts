import { IsString, IsOptional, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateFiliereDto } from "./CreateFiliereDto";
import { CreateImagesDto } from "./CreateImagesDto";

export class CreateSchoolDto {
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  type?: string;
  @IsString()
  commune: string;
  @IsString()
  stateSupport: string;
  @IsString()
  priceLevel: string;
  @IsString()
  logo: string;

  @IsOptional()
  @IsString()
  longitude?: string;

  @IsOptional()
  @IsString()
  latitude?: string;

  // Relation : creation des url des images
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateImagesDto)
  images?: CreateImagesDto[];

  // ✅ Relation : création de filières en même temps
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFiliereDto)
  filieres?: CreateFiliereDto[];
}
