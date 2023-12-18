import { Injectable } from '@nestjs/common';
import { differenceInMonths } from 'date-fns';
import { PrismaService } from 'src/prisma/prisma.service';

import { calculatePercentageChange } from './../../utils/utils';

@Injectable()
export class AnalyticsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getCardAnalytics(): Promise<any> {
    const currentDate = new Date();

    const lastMonthStartDate = differenceInMonths(currentDate, 1);

    const totalUsers = await this.prismaService.user.count();
    // Fetch user data from the last month
    const usersLastMonth = await this.prismaService.user.findMany({
      where: {
        createdAt: {
          gte: new Date(lastMonthStartDate),
          lt: currentDate,
        },
      },
    });
    // Fetch user and order data for the previous month
    const usersPreviousMonth = await this.prismaService.user.findMany({
      where: {
        createdAt: {
          gte: new Date(differenceInMonths(currentDate, 2)),
          lt: new Date(lastMonthStartDate),
        },
      },
    });
    // Calculate the percentage change
    const userPercentageChange = calculatePercentageChange(usersPreviousMonth.length, usersLastMonth.length) || 0;

    const totalCars = await this.prismaService.car.count();
    const carsLastMonth = await this.prismaService.car.findMany({
      where: {
        createdAt: {
          gte: new Date(lastMonthStartDate),
          lt: currentDate,
        },
      },
    });
    const carsPreviousMonth = await this.prismaService.car.findMany({
      where: {
        createdAt: {
          gte: new Date(differenceInMonths(currentDate, 2)),
          lt: new Date(lastMonthStartDate),
        },
      },
    });
    const carPercentageChange = calculatePercentageChange(carsPreviousMonth.length, carsLastMonth.length) || 0;

    const totalOrders = await this.prismaService.order.count();
    const ordersLastMonth = await this.prismaService.order.findMany({
      where: {
        createdAt: {
          gte: new Date(lastMonthStartDate),
          lt: currentDate,
        },
      },
    });
    const ordersPreviousMonth = await this.prismaService.order.findMany({
      where: {
        createdAt: {
          gte: new Date(differenceInMonths(currentDate, 2)),
          lt: new Date(lastMonthStartDate),
        },
      },
    });
    const orderPercentageChange = calculatePercentageChange(ordersPreviousMonth.length, ordersLastMonth.length) || 0;

    return {
      user: {
        totalUsers,
        userPercentageChange,
      },
      car: {
        totalCars,
        carPercentageChange,
      },
      order: {
        totalOrders,
        orderPercentageChange,
      },
    };
  }
}
