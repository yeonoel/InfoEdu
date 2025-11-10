import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { MaillerModule } from "./mailler/mailler.module";
import { SchoolModule } from "./school/school.module";
import { ReviewModule } from "./review/review.module";
import { CriteriaController } from "./criteria/criteria.controller";
import { CriteriaModule } from "./criteria/criteria.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    MaillerModule,
    SchoolModule,
    ReviewModule,
    CriteriaModule,
  ],
})
export class AppModule {}
