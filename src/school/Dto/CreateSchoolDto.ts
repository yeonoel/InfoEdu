import { IsString, IsOptional, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateFiliereDto } from "./CreateFiliereDto";

export class CreateSchoolDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  commune?: string;

  @IsOptional()
  @IsString()
  stateSupport?: string;

  @IsOptional()
  @IsString()
  priceLevel?: string;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsOptional()
  @IsString()
  longitude?: string;

  @IsOptional()
  @IsString()
  latitude?: string;

  // ✅ Relation : création de filières en même temps
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFiliereDto)
  filieres?: CreateFiliereDto[];
}
