import { IsIn, IsInt, IsString } from "class-validator";

export class CreateReviewScoreDto {
  @IsInt()
  criteriaId: number; // ID du critère (ex: Cours théoriques, Cadre étudiant)

  @IsString()
  value: string; // "Très bien" / "Bien" / "Moyen" / "Mauvais"
}
