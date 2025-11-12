import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCriteriaDto } from "./Dto/CreateCriteriaDto";

@Injectable()
export class CriteriaService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCriteriaDto: CreateCriteriaDto) {
    await this.prismaService.criterias.create({
      data: { ...createCriteriaDto },
    });
    return { message: "Critère ajouté avec succès" };
  }
}
