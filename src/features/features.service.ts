import { Injectable, NotFoundException } from '@nestjs/common';
import { FeatureName } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { getPagination } from 'utils/utils';

import { CreateFeatureDto, FeaturesDto, UpdateFeatureDto } from './dto';

@Injectable()
export class FeaturesService {
  constructor(private readonly prismaService: PrismaService) {}

  async createFeature(createFeatureDto: CreateFeatureDto): Promise<FeaturesDto> {
    const { name } = createFeatureDto;

    const feature = await this.prismaService.feature.create({
      data: {
        name: name as FeatureName,
      },
    });

    return feature;
  }

  async findAllFeature(page: number, limit: number): Promise<any> {
    const { _page, _limit } = getPagination(page, limit);

    // Calculate the total number of users
    const totalFeatures = await this.prismaService.feature.count();
    const totalPages = Math.ceil(totalFeatures / _limit);

    // Calculate the number of items to skip
    const offset = (_page - 1) * _limit;

    const features = await this.prismaService.feature.findMany({
      skip: offset,
      take: _limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      data: features,
      meta: {
        total: totalFeatures,
        page: _page,
        per_page: _limit,
        last_page: totalPages,
      },
    };
  }

  async findOneById(id: number): Promise<FeaturesDto> {
    const feature = await this.prismaService.feature.findUnique({
      where: {
        id,
      },
    });

    if (!feature) {
      throw new NotFoundException(`Feature #${id} not found`);
    }

    return feature;
  }

  async updateFeature(id: number, updateFeatureDto: UpdateFeatureDto): Promise<FeaturesDto> {
    const { name } = updateFeatureDto;

    const feature = await this.prismaService.feature.update({
      where: {
        id,
      },
      data: {
        name: name as FeatureName,
      },
    });

    if (!feature) {
      throw new NotFoundException(`Feature #${id} not found`);
    }

    return feature;
  }

  async removeFeature(id: number): Promise<string> {
    const feature = await this.prismaService.feature.delete({
      where: {
        id,
      },
    });

    if (!feature) {
      throw new NotFoundException(`Feature #${id} not found`);
    }

    return `This action removes a #${id} feature`;
  }
}
