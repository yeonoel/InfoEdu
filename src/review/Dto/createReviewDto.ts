import { Type } from "class-transformer";
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Validate,
  ValidateNested,
} from "class-validator";
import { CreateReviewScoreDto } from "./CreateReviewScoreDto";

export class CreateReviewDto {
  @IsString()
  @IsOptional()
  comment?: string;

  @IsInt()
  schoolId: number; // ID de l'école évaluée

  @IsInt()
  userId: number; // ID de l'utilisateur qui fait l'évaluation

  @IsArray()
  scores: CreateReviewScoreDto[]; // Liste des scores pour chaque critère
}
