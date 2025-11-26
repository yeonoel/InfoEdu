import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateSchoolDto } from "./Dto/CreateSchoolDto";
import { PrismaService } from "../prisma/prisma.service";
import { create } from "domain";
import { SearchSchoolsDto } from "./Dto/SearchSchoolDto";

@Injectable()
export class SchoolService {
  constructor(private readonly prismaService: PrismaService) {}

  async createMany(createSchoolDto: CreateSchoolDto[]) {
    return this.prismaService.$transaction(
      createSchoolDto.map((school) => {
        const { filieres, images, ...schoolData  } = school;
        return this.prismaService.schools.create({
          data: {
            ...schoolData,
            images: {
              create: images?.map((image) => ({ url: image.url })) || [],
            },
            filieres: {
              create: filieres?.map((filiere) => ({ name: filiere.name })) || [],
            },
          },
          include: {
            filieres: true,
            images: true
          }
        });
      })
    )
  }

  async findAll() {
    return this.prismaService.schools.findMany({
      include: {
        filieres: true,
        reviews: {
          include: {
            user: {select: {username: true}},
            reviewScores: {
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
    const school = await this.prismaService.schools.findUnique({
      where: { id },
      include: {
        filieres: true,
        images: true,
        reviews: {
          include: {
            user: {select: {username: true}},
            reviewScores: {
              include: {
                criteria: true,
              },
            },
          }
        }
      },
    });

    if (!school) {
      throw new NotFoundException("Université non trouvée");
    }

    return school;
  }

  async remove(id: number) {
    await this.prismaService.schools.delete({
      where: { id },
    });
    return { message: "Université supprimée avec succès" };
  }

   async searchSchools(filters: SearchSchoolsDto) {
  const { filiere, commune, query } = filters;

  const where: any = {};

  // Filtre par commune (insensible à la casse)
  if (commune) {
    where.commune = {
      contains: commune,
      mode: 'insensitive',
    };
  }

  // Filtre par filière (insensible à la casse)
  if (filiere) {
    where.filieres = {
      some: {
        name: {
          contains: filiere,
          mode: 'insensitive',
        },
      },
    };
  }

  // Recherche générale (insensible à la casse)
  if (query) {
    where.OR = [
      { 
        name: { 
          contains: query,
          mode: 'insensitive',
        } 
      },
      { 
        category: { 
          contains: query,
          mode: 'insensitive',
        } 
      },
      { 
        commune: { 
          contains: query,
          mode: 'insensitive',
        } 
      },
    ];
  }

  // Requête Prisma
  const schools = await this.prismaService.schools.findMany({
    where,
    take: 50,
    include: {
      filieres: true,
      reviews: {
        include: {
          reviewScores: {
            include: {
              criteria: true,
            },
          },
          user: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return schools;
}

}
