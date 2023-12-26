import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { getPagination } from 'utils/utils';

import { CreateCarFeatureDto } from './dto/create-car-feature.dto';
import { UpdateCarFeatureDto } from './dto/update-car-feature.dto';

@Injectable()
export class CarFeaturesService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createCarFeatureDto: CreateCarFeatureDto) {
    return 'This action adds a new carFeature';
  }

  async findAll(page: number, limit: number) {
    const { _page, _limit } = getPagination(page, limit);

    // Calculate the total number of users
    const totalFeatures = await this.prismaService.carFeature.count();
    const totalPages = Math.ceil(totalFeatures / _limit);

    // Calculate the number of items to skip
    const offset = (_page - 1) * _limit;

    const features = await this.prismaService.carFeature.findMany({
      skip: offset,
      take: _limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      data: features,
      meta: {
        totalPages,
        _page,
        _limit,
        totalFeatures,
      },
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} carFeature`;
  }

  update(id: number, updateCarFeatureDto: UpdateCarFeatureDto) {
    return `This action updates a #${id} carFeature`;
  }

  remove(id: number) {
    return `This action removes a #${id} carFeature`;
  }
}
