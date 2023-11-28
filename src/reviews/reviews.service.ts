import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { getPagination } from 'utils/utils';

import { CreateReviewDto, UpdateReviewDto } from './dto';

@Injectable()
export class ReviewsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createReview(currentUser: any, createReviewDto: CreateReviewDto): Promise<any> {
    const userId = currentUser.id;

    const newReview = await this.prismaService.review.create({
      data: {
        ...createReviewDto,
        customerId: userId,
      },
    });

    return newReview;
  }

  async findAllReview(page: number, limit: number): Promise<any> {
    const { _page, _limit } = getPagination(page, limit);

    // Calculate the total number of users
    const totalReviews = await this.prismaService.review.count();
    const totalPages = Math.ceil(totalReviews / _limit);

    // Calculate the number of items to skip
    const offset = (_page - 1) * _limit;

    const reviews = await this.prismaService.review.findMany({
      skip: offset,
      take: _limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      data: reviews,
      meta: {
        total: totalReviews,
        page: _page,
        per_page: _limit,
        last_page: totalPages,
      },
    };
  }

  async findOneById(id: number): Promise<any> {
    const review = await this.prismaService.review.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        content: true,
        rating: true,
        carId: true,
        customer: {
          select: {
            avatarUrl: true,
            name: true,
          },
        },
        customerId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!review) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }

    return review;
  }

  async findAllByCarId(id: number): Promise<any> {
    const reviews = await this.prismaService.review.findMany({
      where: {
        carId: id,
      },
      select: {
        id: true,
        content: true,
        rating: true,
        carId: true,
        customer: {
          select: {
            avatarUrl: true,
            name: true,
          },
        },
        customerId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!reviews) {
      throw new NotFoundException(`Reviews with car id ${id} not found`);
    }

    return reviews;
  }

  async updateById(id: number, updateReviewDto: UpdateReviewDto): Promise<any> {
    const review = await this.prismaService.review.update({
      where: {
        id,
      },
      data: {
        ...updateReviewDto,
      },
      select: {
        id: true,
        content: true,
        rating: true,
        carId: true,
        customer: {
          select: {
            avatarUrl: true,
            name: true,
          },
        },
        customerId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!review) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }

    return review;
  }

  async removeById(id: number): Promise<any> {
    const exitsReview = await this.prismaService.review.findUnique({
      where: {
        id,
      },
    });

    if (!exitsReview) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }

    await this.prismaService.review.delete({
      where: {
        id,
      },
    });

    return `This action removes a #${id} review`;
  }
}
