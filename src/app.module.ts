import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: ['.env'] }), PrismaModule, AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
