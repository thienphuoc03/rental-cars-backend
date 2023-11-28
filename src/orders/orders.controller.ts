import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, Query } from '@nestjs/common';
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
import { GetCurrentUser, Roles } from 'src/auth/decorators';
import { RolesGuard } from 'src/auth/guards';

import { CreateOrderDto, OrderDto, UpdateOrderDto } from './dto';
import { OrdersService } from './orders.service';

@ApiBearerAuth()
@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({ summary: 'Create a new order' })
  @ApiExtraModels(OrderDto)
  @ApiResponse({
    status: 201,
    description: 'The order has been successfully created.',
    content: {
      'application/json': {
        schema: { $ref: getSchemaPath(OrderDto) },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiBody({ type: CreateOrderDto })
  @UseGuards(RolesGuard)
  @Roles(RoleName.ADMIN, RoleName.CAROWNER, RoleName.TRAVELER)
  @Post()
  createOrder(@GetCurrentUser() currentUser: any, @Body() createOrderDto: CreateOrderDto): Promise<any> {
    try {
      return this.ordersService.createOrder(currentUser, createOrderDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  @ApiOperation({ summary: 'Get all orders' })
  @ApiExtraModels(OrderDto)
  @ApiResponse({
    status: 200,
    description: 'Get all orders successfully.',
    content: {
      'application/json': {
        schema: { $ref: getSchemaPath(OrderDto) },
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
  @Roles(RoleName.ADMIN, RoleName.CAROWNER, RoleName.TRAVELER)
  @Get()
  findAllOrders(@Query('page') page: number, @Query('limit') limit: number): Promise<any> {
    try {
      return this.ordersService.findAllOrders(page, limit);
    } catch (error) {
      throw new Error(error);
    }
  }

  @ApiOperation({ summary: 'Get order by id' })
  @ApiExtraModels(OrderDto)
  @ApiResponse({
    status: 200,
    description: 'Get order by id successfully.',
    content: {
      'application/json': {
        schema: { $ref: getSchemaPath(OrderDto) },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiParam({ name: 'id', required: true, type: Number })
  @UseGuards(RolesGuard)
  @Roles(RoleName.ADMIN, RoleName.CAROWNER, RoleName.TRAVELER)
  @Get(':id')
  findOneById(@Param('id') id: number): Promise<any> {
    try {
      return this.ordersService.findOneById(+id);
    } catch (error) {
      throw new Error(error);
    }
  }

  @ApiOperation({ summary: 'Update order by id' })
  @ApiExtraModels(OrderDto)
  @ApiResponse({
    status: 200,
    description: 'Update order by id successfully.',
    content: {
      'application/json': {
        schema: { $ref: getSchemaPath(OrderDto) },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiParam({ name: 'id', required: true, type: Number })
  @ApiBody({ type: UpdateOrderDto })
  @UseGuards(RolesGuard)
  @Roles(RoleName.ADMIN, RoleName.CAROWNER, RoleName.TRAVELER)
  @Patch(':id')
  updateOrderById(@Param('id') id: number, @Body() updateOrderDto: UpdateOrderDto): Promise<any> {
    try {
      return this.ordersService.updateOrderById(+id, updateOrderDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  @ApiOperation({ summary: 'Remove order by id' })
  @ApiExtraModels(OrderDto)
  @ApiResponse({
    status: 200,
    description: 'Remove order by id successfully.',
    content: {
      'application/json': {
        schema: { $ref: getSchemaPath(OrderDto) },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiParam({ name: 'id', required: true, type: Number })
  @UseGuards(RolesGuard)
  @Roles(RoleName.ADMIN, RoleName.CAROWNER, RoleName.TRAVELER)
  @Delete(':id')
  removeById(@Param('id') id: number): Promise<any> {
    try {
      return this.ordersService.removeById(+id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
