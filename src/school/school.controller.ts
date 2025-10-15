import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SchoolService } from './school.service';
import { CreateSchoolDto } from './Dto/CreateSchoolDto';

@Controller('school')
export class SchoolController {
    constructor(
        private readonly schoolService: SchoolService
    ) {}

    @Post('new-university')
    create(@Body() createSchoolDto: CreateSchoolDto ) {
            return this.schoolService.create(createSchoolDto);
    }

    @Get('all-university')
    findAll() {
        return this.schoolService.findAll();
    }

    @Delete('delete-universite/:id')
    remove(@Param('id') id: number) {
        return this.schoolService.remove(+id);
    }

    @Put('update-universite/:id')
    update(@Param('id') id: number, @Body() updateSchoolDto: CreateSchoolDto) {
        return this.schoolService.update(+id, updateSchoolDto);
    }

}
