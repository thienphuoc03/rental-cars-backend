import { Injectable } from '@nestjs/common';
import { OrderDetailStatus } from '@prisma/client';
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

    const orderDetailsLastMonth = await this.prismaService.orderDetail.findMany({
      where: {
        createdAt: {
          gte: new Date(lastMonthStartDate),
          lt: currentDate,
        },
        AND: {
          OR: [
            {
              orderDetailStatus: OrderDetailStatus.CONFIRMED,
            },
            {
              orderDetailStatus: OrderDetailStatus.RECEIVED,
            },
            {
              orderDetailStatus: OrderDetailStatus.COMPLETED,
            },
          ],
        },
      },
      select: {
        serviceFee: true,
      },
    });
    const orderDetailsPreviousMonth = await this.prismaService.orderDetail.findMany({
      where: {
        createdAt: {
          gte: new Date(differenceInMonths(currentDate, 2)),
          lt: new Date(lastMonthStartDate),
        },
        AND: {
          OR: [
            {
              orderDetailStatus: OrderDetailStatus.CONFIRMED,
            },
            {
              orderDetailStatus: OrderDetailStatus.RECEIVED,
            },
            {
              orderDetailStatus: OrderDetailStatus.COMPLETED,
            },
          ],
        },
      },
      select: {
        serviceFee: true,
      },
    });
    const revenuePercentageChange =
      calculatePercentageChange(
        orderDetailsPreviousMonth.reduce((acc, orderDetail) => acc + Number(orderDetail.serviceFee), 0),
        orderDetailsLastMonth.reduce((acc, orderDetail) => acc + Number(orderDetail.serviceFee), 0),
      ) || 0;
    const totalRevenue = orderDetailsLastMonth.reduce((acc, orderDetail) => acc + Number(orderDetail.serviceFee), 0);

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
      revenue: {
        totalRevenue,
        revenuePercentageChange,
      },
    };
  }

  async getRevenueAnalytics(fromDay: Date, toDay: Date): Promise<any> {
    const orderDetails = await this.prismaService.orderDetail.findMany({
      where: {
        createdAt: {
          gte: fromDay,
          lt: toDay,
        },
        AND: {
          OR: [
            {
              orderDetailStatus: OrderDetailStatus.CONFIRMED,
            },
            {
              orderDetailStatus: OrderDetailStatus.RECEIVED,
            },
            {
              orderDetailStatus: OrderDetailStatus.COMPLETED,
            },
          ],
        },
      },
      select: {
        serviceFee: true,
        createdAt: true,
      },
    });

    // const countMonth = differenceInMonths(new Date(toDay), new Date(fromDay)) + 1;

    const startingMonthIndex = new Date(fromDay).getMonth();
    const endingMonthIndex = new Date(toDay).getMonth();

    const revenueByMonth = Array.from({ length: endingMonthIndex - startingMonthIndex + 1 }, (_, monthIndex) => {
      const monthName = new Date(new Date().getFullYear(), monthIndex + startingMonthIndex, 1).toLocaleString('vi-Vi', {
        month: 'short',
      });

      return { month: monthName, totalRevenue: 0, totalOrder: 0 };
    });

    if (revenueByMonth.length !== 0) {
      orderDetails.forEach((orderDetail) => {
        const month = new Date(orderDetail.createdAt).getMonth() - new Date(fromDay).getMonth();
        revenueByMonth[month].totalRevenue += Number(orderDetail.serviceFee);
        revenueByMonth[month].totalOrder += 1;
      });
    }

    return revenueByMonth;
  }
}
