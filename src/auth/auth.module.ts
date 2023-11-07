import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.ACCESS_TOKEN_SECRET,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
