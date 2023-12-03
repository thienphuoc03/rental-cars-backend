import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderDetailService } from 'src/order-detail/order-detail.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { getPagination } from 'utils/utils';

import { CreateOrderDto, UpdateOrderDto } from './dto';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly orderDetailService: OrderDetailService,
  ) {}

  async createOrder(currentUser: any, createOrderDto: CreateOrderDto): Promise<any> {
    const order = await this.prismaService.order.create({
      data: {
        ...createOrderDto,
      },
      select: {
        id: true,
        startDate: true,
        endDate: true,
        totalAmount: true,
        customer: {
          select: {
            name: true,
          },
        },
        customerId: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!order) {
      throw new Error('Cannot create order');
    }

    // get order detail by order id
    const orderDetails = await this.prismaService.orderDetail.findMany({
      where: {
        orderId: order.id,
      },
    });

    const orderResponse = { ...order, orderDetail: [...orderDetails] };

    return orderResponse;
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
      data: orders,
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
        startDate: true,
        endDate: true,
        totalAmount: true,
        customer: {
          select: {
            name: true,
          },
        },
        customerId: true,
        status: true,
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

    const orderResponse = { ...order, orderDetail: [...orderDetails] };

    return orderResponse;
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
        startDate: true,
        endDate: true,
        totalAmount: true,
        customer: {
          select: {
            name: true,
          },
        },
        customerId: true,
        status: true,
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

    const orderResponse = { ...order, orderDetail: [...orderDetails] };

    return orderResponse;
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
}
