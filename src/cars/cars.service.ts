import { Injectable } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CarStatus, Fuel, Transmission } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateSlug } from 'utils/utils';

import { CreateCarDto, UpdateCarDto } from './dto';

@ApiBearerAuth()
@ApiTags('cars-images')
@Injectable()
export class CarsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createCar(createCarDto: CreateCarDto, currentUser: any): Promise<any> {
    const slug = generateSlug(createCarDto.name);

    const newCar = await this.prismaService.car.create({
      data: {
        name: createCarDto.name,
        slug,
        licensePlates: createCarDto.licensePlates,
        seats: createCarDto.seats,
        yearOfManufacture: createCarDto.yearOfManufacture,
        transmission: createCarDto.transmission.toUpperCase() as Transmission,
        fuel: createCarDto.fuel.toUpperCase() as Fuel,
        description: createCarDto.description,
        pricePerDay: createCarDto.pricePerDay,
        status: CarStatus.UNAVAILABLE,
        modelId: createCarDto.modelId,
        userId: currentUser.id,
        CarImage: {
          create: createCarDto.images.map((image) => ({
            url: image,
            carId: newCar.id,
          })),
        },
        CarFeature: {
          create: createCarDto.features.map((feature) => ({
            featureId: feature,
            carId: newCar.id,
          })),
        },
      },
    });

    return newCar;
  }

  async findAll(): Promise<any> {
    return `This action returns all cars`;
  }

  async findOne(id: number): Promise<any> {
    return `This action returns a #${id} car`;
  }

  async update(id: number, updateCarDto: UpdateCarDto): Promise<any> {
    return `This action updates a #${id} car`;
  }

  async remove(id: number): Promise<any> {
    return `This action removes a #${id} car`;
  }
}
