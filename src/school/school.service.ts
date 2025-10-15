import { Body, Injectable, NotFoundException, Post } from '@nestjs/common';
import { CreateSchoolDto } from './Dto/CreateSchoolDto';
import { PrismaService } from 'src/prisma/prisma.service';
import { School } from 'generated/prisma';

@Injectable()
export class SchoolService {
       constructor(
        private readonly prismaService: PrismaService
    ) {}

    async create(createSchoolDto: CreateSchoolDto ) {
        const { filieres, ...schoolData } = createSchoolDto;
        await this.prismaService.school.create({
            data: {
                ...schoolData,
                filieres: {
                    create: filieres?.map(filiere => ({ name: filiere.name })) || [],
                },
            },
        });         
    } 
    
    async findAll() {
        return this.prismaService.school.findMany({
            include: {
                filieres: true
            }
        });
    }

    async remove(id: number) {
       await this.prismaService.school.delete({
            where: { id }
        });
         return { message: 'Université supprimée avec succès' };
    }

    async update(id: number, updateSchoolDto: CreateSchoolDto) {
        const {filieres, ...schoolData} = updateSchoolDto;
        const school  = await this.prismaService.school.findUnique({where: {id}});
        if(!school) throw new NotFoundException('Université non trouvée');
        await this.prismaService.school.update({
            where: { id },
            data: { ...schoolData}
        });
         return { message: 'Université modifiée avec succès' };
    }
    


}