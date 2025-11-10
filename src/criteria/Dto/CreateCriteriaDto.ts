import { IsOptional, IsString } from "class-validator";

export class CreateCriteriaDto {
  @IsString()
  label: string;

  @IsString()
  @IsOptional()
  icon?: string; // URL de l'icône représentant le critère (ex: icône de livre pour "Cours théoriques")
}
