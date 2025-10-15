import { Module } from '@nestjs/common';
import { CriteriaService } from './criteria.service';
import { CriteriaController } from './criteria.controller';

@Module({
  providers: [CriteriaService],
  controllers: [CriteriaController]
})
export class CriteriaModule {}
