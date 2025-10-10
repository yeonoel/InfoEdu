 import { Module } from '@nestjs/common';
 import { ConfigModule } from '@nestjs/config';
 import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { MaillerModule } from './mailler/mailler.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}) ,AuthModule, PrismaModule, MaillerModule],
})
export class AppModule {}
