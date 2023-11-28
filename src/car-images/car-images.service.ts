import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { getPagination } from 'utils/utils';

import { CreateCarImageDto, UpdateCarImageDto } from './dto';

@Injectable()
export class CarImagesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCarImageDto: CreateCarImageDto): Promise<any> {
    return 'This action adds a new carImage';
  }

  async findAllCarImage(page: number, limit: number): Promise<any> {
    const { _page, _limit } = getPagination(page, limit);

    const totalCarImages = await this.prismaService.carImage.count();
    const totalPages = Math.ceil(totalCarImages / _limit);

    const offset = (_page - 1) * _limit;

    const carImages = await this.prismaService.carImage.findMany({
      skip: offset,
      take: _limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      data: carImages,
      meta: {
        totalPages,
        _page,
        _limit,
        totalCarImages,
      },
    };
  }

  async findOneById(id: number): Promise<any> {
    const carImage = await this.prismaService.carImage.findFirst({
      where: {
        id,
      },
    });

    if (!carImage) {
      throw new NotFoundException(`Car image with id ${id} not found`);
    }

    return carImage;
  }

  async findOneByCarId(carId: number): Promise<any> {
    const carImage = await this.prismaService.carImage.findFirst({
      where: {
        carId,
      },
    });

    if (!carImage) {
      throw new NotFoundException(`Car image with car id ${carId} not found`);
    }

    return carImage;
  }

  async update(id: number, updateCarImageDto: UpdateCarImageDto): Promise<any> {
    return `This action updates a #${id} carImage`;
  }

  async remove(id: number): Promise<any> {
    const exitsCarImage = await this.prismaService.carImage.findFirst({
      where: {
        id,
      },
    });

    if (!exitsCarImage) {
      throw new NotFoundException(`Car image with id ${id} not found`);
    }

    await this.prismaService.carImage.delete({
      where: {
        id,
      },
    });

    return `Delete car image by id: ${id}`;
  }
}
