import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderDetailStatus, OrderStatus, PaymentStatus } from '@prisma/client';
import * as moment from 'moment';
import { OrderDetailService } from 'src/order-detail/order-detail.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { formatDecimalToNumber, getPagination } from 'utils/utils';

import { UpdateOrderDto } from './dto';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly orderDetailService: OrderDetailService,
  ) {}

  async createOrder(currentUser: any, createOrderDto: any): Promise<any> {
    const { items } = createOrderDto;

    const totalAmount = await items.reduce((total: any, item: { totalAmount: any }) => {
      return total + item?.totalAmount;
    }, 0);

    const deposits = await items.reduce((total: any, item: { deposits: any }) => {
      return total + item?.deposits;
    }, 0);

    const order = await this.prismaService.order.create({
      data: {
        totalAmount: totalAmount,
        travelerId: currentUser.id,
        deposits: deposits,
        orderStatus: OrderStatus.PENDING,
        paymentStatus: PaymentStatus.DEPOSIT,
        OrderDetail: {
          create: items.map((item: any) => ({
            carId: item.carId,
            pricePerDay: item.pricePerDay,
            startDate: new Date(moment(item.startDate, 'DD/MM/YYYY').format('YYYY-MM-DD')),
            endDate: new Date(moment(item.endDate, 'DD/MM/YYYY').format('YYYY-MM-DD')),
            deposits: item.deposits,
            totalAmount: item.totalAmount,
            orderDetailStatus: OrderDetailStatus.PENDING,
            paymentStatus: PaymentStatus.DEPOSIT,
          })),
        },
      },
      select: {
        id: true,
        totalAmount: true,
        traveler: {
          select: {
            name: true,
          },
        },
        OrderDetail: {
          select: {
            id: true,
            car: {
              select: {
                name: true,
              },
            },
            startDate: true,
            endDate: true,
            totalAmount: true,
            orderDetailStatus: true,
            paymentStatus: true,
          },
        },
        travelerId: true,
        orderStatus: true,
        paymentStatus: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!order) {
      throw new Error('Cannot create order');
    }

    return order;
  }

  async findAllOrders(page: number, limit: number): Promise<any> {
    const { _page, _limit } = getPagination(page, limit);

    const totalOrders = await this.prismaService.order.count();
    const totalPages = Math.ceil(totalOrders / _limit);

    const offset = (_page - 1) * _limit;

    const orders = await this.prismaService.order.findMany({
      skip: offset,
      take: _limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      data: orders.map((order: any) => {
        return {
          ...order,
          totalAmount: formatDecimalToNumber(order.totalAmount),
          deposits: formatDecimalToNumber(order.deposits),
        };
      }),
      meta: {
        totalPages,
        _page,
        _limit,
        totalOrders,
      },
    };
  }

  async findOneById(id: number): Promise<any> {
    const order = await this.prismaService.order.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        totalAmount: true,
        deposits: true,
        traveler: {
          select: {
            id: true,
            name: true,
          },
        },
        travelerId: true,
        orderStatus: true,
        paymentStatus: true,
        createdAt: true,
        updatedAt: true,
        OrderDetail: {
          include: {
            car: {
              include: {
                CarImage: true,
              },
            },
            review: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    return {
      ...order,
      totalAmount: formatDecimalToNumber(order.totalAmount),
      deposits: formatDecimalToNumber(order.deposits),
      traveler: order.traveler.name,
      orderDetails: order.OrderDetail.map((item: any) => {
        return {
          ...item,
          pricePerDay: formatDecimalToNumber(item.pricePerDay),
          totalAmount: formatDecimalToNumber(item.totalAmount),
          deposits: formatDecimalToNumber(item.deposits),
          car: {
            ...item.car,
            images: item.car.CarImage.map((image: any) => image.url),
            CarImage: undefined,
          },
        };
      }),
      OrderDetail: undefined,
    };
  }

  async updateOrderById(id: number, updateOrderDto: UpdateOrderDto): Promise<any> {
    const order = await this.prismaService.order.update({
      where: {
        id,
      },
      data: {
        ...updateOrderDto,
      },
      select: {
        id: true,
        totalAmount: true,
        traveler: {
          select: {
            name: true,
          },
        },
        travelerId: true,
        orderStatus: true,
        paymentStatus: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    // get order detail by order id
    const orderDetails = await this.prismaService.orderDetail.findMany({
      where: {
        orderId: order.id,
      },
    });

    return { ...order, orderDetail: [...orderDetails] };
  }

  async removeById(id: number): Promise<any> {
    const exitsOrder = await this.prismaService.order.findUnique({
      where: {
        id,
      },
    });

    if (!exitsOrder) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    await this.prismaService.orderDetail.deleteMany({
      where: {
        orderId: id,
      },
    });

    return `This action removes a #${id} order`;
  }

  async getMyOrders(currentUser: any, page: number, limit: number): Promise<any> {
    const { _page, _limit } = getPagination(page, limit);

    const totalOrders = await this.prismaService.order.count({
      where: {
        travelerId: currentUser.id,
      },
    });
    const totalPages = Math.ceil(totalOrders / _limit);

    const offset = (_page - 1) * _limit;

    const orders = await this.prismaService.order.findMany({
      where: {
        travelerId: currentUser.id,
      },
      skip: offset,
      take: _limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      data: orders.map((order: any) => {
        return {
          ...order,
          totalAmount: formatDecimalToNumber(order.totalAmount),
          deposits: formatDecimalToNumber(order.deposits),
        };
      }),
      meta: {
        totalPages,
        _page,
        _limit,
        totalOrders,
      },
    };
  }
}
