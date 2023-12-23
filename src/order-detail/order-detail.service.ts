import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderDetailStatus, PaymentStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { formatDecimalToNumber, getPagination } from 'utils/utils';

import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';

@Injectable()
export class OrderDetailService {
  constructor(private readonly prismaService: PrismaService) {}

  async createOrderDetail(createOrderDetailDto: CreateOrderDetailDto): Promise<any> {
    const orderDetail = await this.prismaService.orderDetail.create({
      data: {
        ...createOrderDetailDto,
      },
    });

    return orderDetail;
  }

  async findAllOrderDetail(page: number, limit: number): Promise<any> {
    const { _page, _limit } = getPagination(page, limit);

    // Calculate the total number of users
    const totalOrderDetail = await this.prismaService.orderDetail.count();
    const totalPages = Math.ceil(totalOrderDetail / _limit);

    // Calculate the number of items to skip
    const offset = (_page - 1) * _limit;

    const orderDetails = await this.prismaService.orderDetail.findMany({
      skip: offset,
      take: _limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      data: orderDetails,
      meta: {
        total: totalOrderDetail,
        page: _page,
        per_page: _limit,
        last_page: totalPages,
      },
    };
  }

  async findOneById(id: number): Promise<any> {
    const orderDetail = await this.prismaService.orderDetail.findUnique({
      where: {
        id,
      },
      include: {
        car: {
          include: {
            model: {
              include: {
                brand: true,
              },
            },
            CarColor: true,
            CarImage: true,
          },
        },
      },
    });

    if (!orderDetail) {
      throw new NotFoundException(`Order Detail with id ${id} not found`);
    }

    return {
      ...orderDetail,
      pricePerDay: formatDecimalToNumber(orderDetail.pricePerDay),
      deposits: formatDecimalToNumber(orderDetail.deposits),
      totalAmount: formatDecimalToNumber(orderDetail.totalAmount),
      car: {
        ...orderDetail.car,
        pricePerDay: formatDecimalToNumber(orderDetail.car.pricePerDay),
        model: orderDetail.car.model.name,
        brand: orderDetail.car.model.brand.name,
        color: orderDetail.car.CarColor.name,
        images: orderDetail.car.CarImage.map((image) => image.url),
        CarImage: undefined,
        CarColor: undefined,
      },
    };
  }

  async updateById(id: number, updateOrderDetailDto: UpdateOrderDetailDto): Promise<any> {
    const orderDetail = await this.prismaService.orderDetail.update({
      where: {
        id,
      },
      data: {
        ...updateOrderDetailDto,
      },
    });

    if (!orderDetail) {
      throw new NotFoundException(`Order Detail with id ${id} not found`);
    }

    return orderDetail;
  }

  async removeById(id: number): Promise<any> {
    const exitsOrderDetail = await this.prismaService.orderDetail.findUnique({
      where: {
        id,
      },
    });

    if (!exitsOrderDetail) {
      throw new NotFoundException(`Order Detail with id ${id} not found`);
    }

    await this.prismaService.orderDetail.delete({
      where: {
        id,
      },
    });

    return `This action removes a #${id} orderDetail`;
  }

  async getAllByOrderId(orderId: number): Promise<any> {
    const orderDetails = await this.prismaService.orderDetail.findMany({
      where: {
        id: orderId,
      },
      select: {
        id: true,
        orderId: true,
        car: {
          select: {
            id: true,
            name: true,
          },
        },
        pricePerDay: true,
        deposits: true,
        totalAmount: true,
        orderDetailStatus: true,
        paymentStatus: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!orderDetails) {
      throw new NotFoundException(`Order with id ${orderId} not found`);
    }

    return orderDetails;
  }

  async getAllByUserId(userId: number): Promise<any> {
    const orderDetails = await this.prismaService.orderDetail.findMany({
      where: {
        car: {
          user: {
            id: userId,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!orderDetails) {
      throw new NotFoundException(`Order with id ${userId} not found`);
    }

    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    const todayNumber = Number(todayString.replace(/-/g, ''));

    const updateOrderDetails = orderDetails.map(async (orderDetail) => {
      const { startDate, orderDetailStatus } = orderDetail;
      const startDateString = startDate.toISOString().split('T')[0];
      const startDateNumber = Number(startDateString.replace(/-/g, ''));

      if (startDateNumber <= todayNumber && orderDetailStatus === OrderDetailStatus.PENDING) {
        const update = await this.prismaService.orderDetail.update({
          where: {
            id: orderDetail.id,
          },
          data: {
            orderDetailStatus: OrderDetailStatus.CANCELED,
            paymentStatus: PaymentStatus.REFUND,
            note: 'Tự động hủy đơn do quá hạn',
          },
        });

        return update;
      }

      return orderDetail;
    });

    return Promise.all(updateOrderDetails).then((orderDetail) =>
      orderDetail.map((orderDetail) => ({
        ...orderDetail,
        pricePerDay: formatDecimalToNumber(orderDetail.pricePerDay),
        deposits: formatDecimalToNumber(orderDetail.deposits),
        totalAmount: formatDecimalToNumber(orderDetail.totalAmount),
      })),
    );
  }

  async updateOrderDetailStatusById(id: number, updateOrderDetailDto: any): Promise<any> {
    const data = {
      ...updateOrderDetailDto,
      carId: undefined,
    };

    const orderDetail = await this.prismaService.orderDetail.update({
      where: {
        id,
        carId: updateOrderDetailDto.carId,
      },
      data,
    });

    if (!orderDetail) {
      throw new NotFoundException(`Order Detail with id ${id} not found`);
    }

    return {
      ...orderDetail,
      pricePerDay: formatDecimalToNumber(orderDetail.pricePerDay),
      deposits: formatDecimalToNumber(orderDetail.deposits),
      totalAmount: formatDecimalToNumber(orderDetail.totalAmount),
    };
  }

  async updatePaymentStatusById(id: number, body: any): Promise<any> {
    const { paymentStatus, carId } = body;

    const orderDetail = await this.prismaService.orderDetail.update({
      where: {
        id,
        carId,
      },
      data: {
        paymentStatus: paymentStatus as PaymentStatus,
      },
    });

    if (!orderDetail) {
      throw new NotFoundException(`Order Detail with id ${id} not found`);
    }

    return orderDetail;
  }

  async getDisableDateByCarId(carId: number): Promise<any> {
    const orderDetails = await this.prismaService.orderDetail.findMany({
      where: {
        carId: Number(carId),
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
        startDate: true,
        endDate: true,
      },
    });

    if (!orderDetails) {
      throw new NotFoundException(`Order Detail with car id ${carId} not found`);
    }

    return orderDetails;
  }
}
