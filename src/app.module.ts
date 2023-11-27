import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/guards';

import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/strategies';
import { CarBrandsModule } from './car-brands/car-brands.module';
import { CarColorsModule } from './car-colors/car-colors.module';
import { CarFeaturesModule } from './car-features/car-features.module';
import { CarImagesModule } from './car-images/car-images.module';
import { CarModelsModule } from './car-models/car-models.module';
import { CarsModule } from './cars/cars.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { FeaturesModule } from './features/features.module';
import { OrderDetailModule } from './order-detail/order-detail.module';
import { OrdersModule } from './orders/orders.module';
import { PrismaModule } from './prisma/prisma.module';
import { ReviewsModule } from './reviews/reviews.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env.local'] }),
    PrismaModule,
    AuthModule,
    UsersModule,
    CarBrandsModule,
    CarModelsModule,
    RolesModule,
    CarColorsModule,
    FeaturesModule,
    CarsModule,
    CarImagesModule,
    OrdersModule,
    OrderDetailModule,
    CarFeaturesModule,
    ReviewsModule,
    CloudinaryModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
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
