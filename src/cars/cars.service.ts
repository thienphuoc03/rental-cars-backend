import { Injectable, NotFoundException } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CarStatus, Fuel, Transmission } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateSlug, getPagination } from 'utils/utils';

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
        address: createCarDto.address,
        status: CarStatus.UNAVAILABLE,
        modelId: Number(createCarDto.modelId),
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

  async findAllCar(page: number, limit: number): Promise<any> {
    const { _page, _limit } = getPagination(page, limit);

    // Calculate the total number of users
    const totalCars = await this.prismaService.car.count();
    const totalPages = Math.ceil(totalCars / _limit);

    // Calculate the number of items to skip
    const offset = (_page - 1) * _limit;

    const cars = await this.prismaService.car.findMany({
      skip: offset,
      take: _limit,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        slug: true,
        licensePlates: true,
        seats: true,
        yearOfManufacture: true,
        transmission: true,
        fuel: true,
        description: true,
        pricePerDay: true,
        address: true,
        status: true,
        model: {
          select: {
            name: true,
            brand: {
              select: {
                name: true,
              },
            },
          },
        },
        CarImage: {
          select: {
            url: true,
          },
        },
        CarFeature: {
          select: {
            feature: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    const carsResponse = cars.map((car) => ({
      ...car,
      model: car.model.name,
      brand: car.model.brand.name,
      CarImage: car.CarImage.map((image) => image.url),
      CarFeature: car.CarFeature.map((feature) => feature.feature.name),
    }));

    return {
      data: carsResponse,
      meta: {
        totalPages,
        _page,
        _limit,
        totalCars,
      },
    };
  }

  async findOneById(id: number): Promise<any> {
    const car = await this.prismaService.car.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        licensePlates: true,
        seats: true,
        yearOfManufacture: true,
        transmission: true,
        fuel: true,
        description: true,
        pricePerDay: true,
        address: true,
        status: true,
        model: {
          select: {
            name: true,
            brand: {
              select: {
                name: true,
              },
            },
          },
        },
        CarImage: {
          select: {
            url: true,
          },
        },
        CarFeature: {
          select: {
            feature: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!car) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }

    const carResponse = {
      ...car,
      model: car.model.name,
      brand: car.model.brand.name,
      CarImage: car.CarImage.map((image) => image.url),
      CarFeature: car.CarFeature.map((feature) => feature.feature.name),
    };

    return carResponse;
  }

  async updateCarById(id: number, updateCarDto: UpdateCarDto): Promise<any> {
    const exitsCar = await this.prismaService.car.findFirst({
      where: {
        id,
      },
    });

    if (!exitsCar) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }

    const slug = generateSlug(updateCarDto.name);

    const car = await this.prismaService.car.update({
      where: {
        id,
      },
      data: {
        name: updateCarDto.name,
        slug: slug,
        licensePlates: updateCarDto.licensePlates,
        seats: updateCarDto.seats,
        yearOfManufacture: updateCarDto.yearOfManufacture,
        transmission: updateCarDto.transmission.toUpperCase() as Transmission,
        fuel: updateCarDto.fuel.toUpperCase() as Fuel,
        description: updateCarDto.description,
        pricePerDay: updateCarDto.pricePerDay,
        address: updateCarDto.address,
        status: CarStatus.UNAVAILABLE,
        modelId: Number(updateCarDto.modelId),
      },
      select: {
        id: true,
        name: true,
        slug: true,
        licensePlates: true,
        seats: true,
        yearOfManufacture: true,
        transmission: true,
        fuel: true,
        description: true,
        pricePerDay: true,
        address: true,
        status: true,
        model: {
          select: {
            name: true,
            brand: {
              select: {
                name: true,
              },
            },
          },
        },
        CarImage: {
          select: {
            url: true,
          },
        },
        CarFeature: {
          select: {
            feature: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    const carResponse = {
      ...car,
      model: car.model.name,
      brand: car.model.brand.name,
      CarImage: car.CarImage.map((image) => image.url),
      CarFeature: car.CarFeature.map((feature) => feature.feature.name),
    };

    return carResponse;
  }

  async removeById(id: number): Promise<any> {
    const car = await this.prismaService.car.delete({
      where: {
        id,
      },
    });

    if (!car) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }

    return `Delete a car by id: ${id} successfully.`;
  }
}
