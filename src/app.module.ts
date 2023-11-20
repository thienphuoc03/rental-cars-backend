import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { AuthModule } from './auth/auth.module';
import { AtGuard } from './auth/guards';
import { JwtStrategy } from './auth/strategies';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { CarBrandsModule } from './car-brands/car-brands.module';
import { CarModelsModule } from './car-models/car-models.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env'] }),
    PrismaModule,
    AuthModule,
    UsersModule,
    CarBrandsModule,
    CarModelsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    {
      provide: 'APP_STRATEGY',
      useClass: JwtStrategy,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
