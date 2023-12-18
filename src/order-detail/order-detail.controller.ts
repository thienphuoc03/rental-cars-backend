import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { RoleName } from '@prisma/client';
import { MetaSchema } from 'schemas';
import { GetCurrentUser, Public, Roles } from 'src/auth/decorators';
import { RolesGuard } from 'src/auth/guards';

import { CreateOrderDetailDto, OrderDetailDto, UpdateOrderDetailDto } from './dto';
import { OrderDetailService } from './order-detail.service';

@ApiBearerAuth()
@ApiTags('Order Detail')
@Controller('order-detail')
export class OrderDetailController {
  constructor(private readonly orderDetailService: OrderDetailService) {}

  @ApiOperation({ summary: 'Create a new orderDetail' })
  @ApiExtraModels(OrderDetailDto)
  @ApiResponse({
    status: 201,
    description: 'The orderDetail has been successfully created.',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/OrderDetailDto' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiBody({ type: CreateOrderDetailDto })
  @UseGuards(RolesGuard)
  @Post()
  createOrderDetail(@Body() createOrderDetailDto: CreateOrderDetailDto): Promise<any> {
    return this.orderDetailService.createOrderDetail(createOrderDetailDto);
  }

  @ApiOperation({ summary: 'Get all orderDetail' })
  @ApiExtraModels(OrderDetailDto)
  @ApiResponse({
    status: 200,
    description: 'Get all orderDetail successfully.',
    content: {
      'application/json': {
        schema: {
          allOf: [
            {
              properties: {
                data: {
                  type: 'array',
                  items: { $ref: getSchemaPath(OrderDetailDto) },
                },
              },
            },
            {
              properties: {
                meta: {
                  $ref: getSchemaPath(MetaSchema),
                },
              },
            },
          ],
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @UseGuards(RolesGuard)
  @Roles(RoleName.ADMIN, RoleName.TRAVELER, RoleName.CAROWNER)
  @Get()
  findAllOrderDetail(@Query('page') page: number, @Query('limit') limit: number): Promise<any> {
    return this.orderDetailService.findAllOrderDetail(page, limit);
  }

  @ApiOperation({ summary: 'Get a orderDetail by id' })
  @ApiExtraModels(OrderDetailDto)
  @ApiResponse({
    status: 200,
    description: 'Get a orderDetail by id successfully.',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/OrderDetailDto' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'OrderDetail not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiParam({ name: 'id', required: true, type: Number })
  @UseGuards(RolesGuard)
  @Roles(RoleName.ADMIN, RoleName.TRAVELER, RoleName.CAROWNER)
  @Get(':id')
  findOneById(@Param('id') id: number): Promise<any> {
    return this.orderDetailService.findOneById(+id);
  }

  @ApiOperation({ summary: 'Update a orderDetail by id' })
  @ApiExtraModels(OrderDetailDto)
  @ApiResponse({
    status: 200,
    description: 'Update a orderDetail by id successfully.',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/OrderDetailDto' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'OrderDetail not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiParam({ name: 'id', required: true, type: Number })
  @ApiBody({ type: UpdateOrderDetailDto })
  @UseGuards(RolesGuard)
  @Roles(RoleName.ADMIN, RoleName.TRAVELER, RoleName.CAROWNER)
  @Patch(':id')
  updateById(@Param('id') id: number, @Body() updateOrderDetailDto: UpdateOrderDetailDto): Promise<any> {
    return this.orderDetailService.updateById(+id, updateOrderDetailDto);
  }

  @ApiOperation({ summary: 'Remove a orderDetail by id' })
  @ApiExtraModels(OrderDetailDto)
  @ApiResponse({
    status: 200,
    description: 'Remove a orderDetail by id successfully.',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/OrderDetailDto' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'OrderDetail not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiParam({ name: 'id', required: true, type: Number })
  @UseGuards(RolesGuard)
  @Roles(RoleName.ADMIN, RoleName.TRAVELER, RoleName.CAROWNER)
  @Delete(':id')
  removeById(@Param('id') id: number): Promise<any> {
    return this.orderDetailService.removeById(+id);
  }

  @Public()
  @Get('order/:orderId')
  getAllByOrderId(orderId: number): Promise<any> {
    return this.orderDetailService.getAllByOrderId(orderId);
  }

  @UseGuards(RolesGuard)
  @Roles(RoleName.ADMIN, RoleName.TRAVELER, RoleName.CAROWNER)
  @Get('/user/my-orders')
  getAllByUserId(@GetCurrentUser() currentUser: any): Promise<any> {
    const { id } = currentUser;

    return this.orderDetailService.getAllByUserId(id);
  }

  @UseGuards(RolesGuard)
  @Roles(RoleName.ADMIN, RoleName.CAROWNER)
  @Patch('/update/status/:id')
  updateOrderDetailStatusById(@Param('id') id: number, @Body() updateOrderDetailDto: any): Promise<any> {
    return this.orderDetailService.updateOrderDetailStatusById(+id, updateOrderDetailDto);
  }

  @UseGuards(RolesGuard)
  @Roles(RoleName.ADMIN, RoleName.CAROWNER)
  @Patch('/update/payment-status/:id')
  updatePaymentStatusById(@Param('id') id: number, @Body() body: any): Promise<any> {
    return this.orderDetailService.updatePaymentStatusById(+id, body);
  }

  @Public()
  @Get('disable-date/car/:carId')
  getDisableDateByCarId(@Param('carId') carId: number): Promise<any> {
    return this.orderDetailService.getDisableDateByCarId(carId);
  }
}
