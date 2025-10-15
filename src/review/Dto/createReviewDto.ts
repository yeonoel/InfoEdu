import { Type } from "class-transformer";
import { IsArray, IsInt, IsString, Validate, ValidateNested } from "class-validator";
import { CreateCriteriaDto } from "src/criteria/Dto/CreateCriteriaDto";


export class CreateReviewDto {
    @IsString()
    comment: string;

    @IsInt()
    schoolId: number; // ID de l'école évaluée

    @IsInt()
    userId: number; // ID de l'utilisateur qui fait l'évaluation

     @IsArray()
     @ValidateNested({ each: true })   
     @Type(() => CreateCriteriaDto)
    scores: CreateCriteriaDto[]; // Liste des scores pour chaque critère

}