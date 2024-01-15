import { Injectable } from '@nestjs/common';
import { OrderDetailStatus, RoleName } from '@prisma/client';
import { addDays, endOfMonth, startOfMonth, subMonths } from 'date-fns';
import { PrismaService } from 'src/prisma/prisma.service';

import { calculatePercentageChange } from './../../utils/utils';

@Injectable()
export class AnalyticsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getCardAnalytics(): Promise<any> {
    const currentDate = new Date();

    // start date and end date of the last month
    const lastMonthStartDate = new Date(startOfMonth(subMonths(currentDate, 1)));
    const lastMonthEndDate = new Date(endOfMonth(subMonths(currentDate, 1)));

    // start date and end date of the current month
    const currentMonthStartDate = new Date(addDays(startOfMonth(currentDate), 1));
    const currentMonthEndDate = new Date(endOfMonth(currentDate));

    // const lastMonthStartDate = differenceInMonths(currentDate, 1);

    const totalUsers = await this.prismaService.user.count();
    // Fetch user data from the last month
    const usersLastMonth = await this.prismaService.user.findMany({
      where: {
        createdAt: {
          gte: lastMonthStartDate,
          lt: lastMonthEndDate,
        },
      },
    });

    // Fetch user and order data for the previous month
    const usersCurrentMonth = await this.prismaService.user.findMany({
      where: {
        createdAt: {
          gte: currentMonthStartDate,
          lt: currentMonthEndDate,
        },
      },
    });

    // Calculate the percentage change
    const userPercentageChange = calculatePercentageChange(usersLastMonth.length, usersCurrentMonth.length) || 0;

    const totalCars = await this.prismaService.car.count();
    const carsLastMonth = await this.prismaService.car.findMany({
      where: {
        createdAt: {
          gte: lastMonthStartDate,
          lt: lastMonthEndDate,
        },
      },
    });
    const carsPreviousMonth = await this.prismaService.car.findMany({
      where: {
        createdAt: {
          gte: currentMonthStartDate,
          lt: currentMonthEndDate,
        },
      },
    });
    const carPercentageChange = calculatePercentageChange(carsLastMonth.length, carsPreviousMonth.length) || 0;

    const totalOrders = await this.prismaService.order.count();
    const ordersLastMonth = await this.prismaService.order.findMany({
      where: {
        createdAt: {
          gte: lastMonthStartDate,
          lt: lastMonthEndDate,
        },
      },
    });
    const ordersPreviousMonth = await this.prismaService.order.findMany({
      where: {
        createdAt: {
          gte: currentMonthStartDate,
          lt: currentMonthEndDate,
        },
      },
    });
    const orderPercentageChange = calculatePercentageChange(ordersLastMonth.length, ordersPreviousMonth.length) || 0;

    const orderDetailsLastMonth = await this.prismaService.orderDetail.findMany({
      where: {
        createdAt: {
          gte: lastMonthStartDate,
          lt: lastMonthEndDate,
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
          gte: currentMonthStartDate,
          lt: currentMonthEndDate,
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

    const totalServiceFeeLastMonth = orderDetailsLastMonth.reduce(
      (acc, orderDetail) => acc + Number(orderDetail.serviceFee),
      0,
    );
    const totalServiceFeeCurrentMonth = orderDetailsPreviousMonth.reduce(
      (acc, orderDetail) => acc + Number(orderDetail.serviceFee),
      0,
    );

    const revenuePercentageChange =
      calculatePercentageChange(totalServiceFeeLastMonth, totalServiceFeeCurrentMonth) || 0;
    const totalRevenue = totalServiceFeeLastMonth + totalServiceFeeCurrentMonth;

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

  async getUserTypeAnalytics(): Promise<any> {
    const totalUsers = await this.prismaService.user.count();

    const adminCount = await this.prismaService.user.count({
      where: {
        role: {
          name: RoleName.ADMIN,
        },
      },
    });

    const ownerCount = await this.prismaService.user.count({
      where: {
        role: {
          name: RoleName.CAROWNER,
        },
      },
    });

    const travelerCount = await this.prismaService.user.count({
      where: {
        role: {
          name: RoleName.TRAVELER,
        },
      },
    });

    const data = [];

    data.push({
      name: 'Admin',
      color: '#FFBB28',
      value: adminCount,
    });
    data.push({
      name: 'Chủ xe',
      color: '#0088FE',
      value: ownerCount,
    });
    data.push({
      name: 'Khách thuê',
      color: '#00C49F',
      value: travelerCount,
    });

    return data;
  }
}
