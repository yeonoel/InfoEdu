import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateSchoolDto } from "./Dto/CreateSchoolDto";
import { PrismaService } from "src/prisma/prisma.service";
import { create } from "domain";

@Injectable()
export class SchoolService {
  constructor(private readonly prismaService: PrismaService) {}

  async createMany(createSchoolDto: CreateSchoolDto[]) {
    return this.prismaService.$transaction(
      createSchoolDto.map((school) => {
        const { filieres, ...schoolData } = school;
        return this.prismaService.school.create({
          data: {
            ...schoolData,
            filieres: {
              create: filieres?.map((filiere) => ({ name: filiere.name })) || [],
            },
          },
        });
      })
    )
  }

  async findAll() {
    return this.prismaService.school.findMany({
      include: {
        filieres: true,
        reviews: {
          include: {
            scores: {
              include: {
                criteria: true,
              },
            },
          },
        },
      },
    });
  }

  async getOne(id: number){
    const school = await this.prismaService.school.findUnique({
      where: { id },
      include: {
        filieres: true,
        reviews: true,
      },
    });

    if (!school) {
      throw new NotFoundException("Université non trouvée");
    }

    return school;
  }

  async remove(id: number) {
    await this.prismaService.school.delete({
      where: { id },
    });
    return { message: "Université supprimée avec succès" };
  }

  /*async update(id: number, updateSchoolDto: CreateSchoolDto) {
    const { filieres, ...schoolData } = updateSchoolDto;
    const school = await this.prismaService.school.findUnique({
      where: { id },
    });
    if (!school) throw new NotFoundException("Université non trouvée");
    await this.prismaService.school.update({
      where: { id },
      data: { 
        ...schoolData,
        filieres: filieres ? {
            create: filieres.map((f) => ({
                name: f.name,
            }))
        } : undefined,
      }
    });
    return { message: "Université modifiée avec succès" };
  }*/
}
