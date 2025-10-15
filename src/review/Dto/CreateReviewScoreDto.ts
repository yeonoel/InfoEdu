import { IsIn, IsInt } from "class-validator";


export class CreateReviewScoreDto {
    @IsInt()
    criteriaId: number; // ID du critère (ex: Cours théoriques, Cadre étudiant)

    @IsInt()
    value: String; // "Très bien" / "Bien" / "Moyen" / "Mauvais"

}

