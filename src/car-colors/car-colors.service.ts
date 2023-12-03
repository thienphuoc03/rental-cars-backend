import { Injectable, NotFoundException } from '@nestjs/common';
import { CarColorName } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { getPagination } from 'utils/utils';

import { CarColorsDto, CreateCarColorDto, UpdateCarColorDto } from './dto';

@Injectable()
export class CarColorsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createCarColor(
    createCarColorDto: CreateCarColorDto,
  ): Promise<CarColorsDto> {
    const { name } = createCarColorDto;

    const carColor = await this.prismaService.carColor.create({
      data: {
        name: name as CarColorName,
      },
    });

    return carColor;
  }

  async findAllColor(page: number, limit: number): Promise<any> {
    const { _page, _limit } = getPagination(page, limit);

    // Calculate the total number of users
    const totalCarColors = await this.prismaService.carColor.count();
    const totalPages = Math.ceil(totalCarColors / _limit);

    // Calculate the number of items to skip
    const offset = (_page - 1) * _limit;

    const carColors = await this.prismaService.carColor.findMany({
      skip: offset,
      take: _limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      data: carColors,
      meta: {
        total: totalCarColors,
        page: _page,
        last_page: totalPages,
      },
    };
  }

  async findOneById(id: number): Promise<CarColorsDto> {
    const carColor = await this.prismaService.carColor.findUnique({
      where: {
        id,
      },
    });

    if (!carColor) {
      throw new NotFoundException(`Car color #${id} not found`);
    }

    return carColor;
  }

  async updateColor(
    id: number,
    updateCarColorDto: UpdateCarColorDto,
  ): Promise<CarColorsDto> {
    const { name } = updateCarColorDto;

    const carColor = await this.prismaService.carColor.update({
      where: {
        id,
      },
      data: {
        name: name as CarColorName,
      },
    });

    if (!carColor) {
      throw new NotFoundException(`Car color #${id} not found`);
    }

    return carColor;
  }

  async removeColor(id: number): Promise<string> {
    const carColor = await this.prismaService.carColor.delete({
      where: {
        id,
      },
    });

    if (!carColor) {
      throw new NotFoundException(`Car color #${id} not found`);
    }

    return `Removed a #${id} carColor`;
  }
}
