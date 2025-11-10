import { Body, Controller, Post } from "@nestjs/common";
import { CriteriaService } from "./criteria.service";
import { CreateCriteriaDto } from "./Dto/CreateCriteriaDto";

@Controller("criteria")
export class CriteriaController {
  constructor(private readonly criteriaService: CriteriaService) {}

  @Post("new-criteria")
  create(@Body() createCriteriaDto: CreateCriteriaDto) {
    return this.criteriaService.create(createCriteriaDto);
  }
}
