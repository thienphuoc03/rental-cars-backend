import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { RoleName } from '@prisma/client';
import { GetCurrentUser, Roles } from 'src/auth/decorators';
import { RolesGuard } from 'src/auth/guards';
import { CarDto, CreateCarDto, UpdateCarDto } from 'src/cars/dto';

import { CarsService } from './cars.service';

@ApiBearerAuth()
@ApiTags('cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @ApiOperation({ summary: 'Create a new car' })
  @ApiExtraModels(CarDto)
  @ApiResponse({
    status: 201,
    description: 'Car created successfully.',
    content: {
      'application/json': {
        schema: { $ref: getSchemaPath(CarDto) },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiBody({ type: CreateCarDto })
  @UseGuards(RolesGuard)
  @Roles(RoleName.ADMIN, RoleName.CAROWNER)
  @Post()
  createCar(
    @GetCurrentUser() currentUser: any,
    @Body() createCarDto: CreateCarDto,
  ): Promise<any> {
    try {
      return this.carsService.createCar(createCarDto, currentUser);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get()
  findAll(): Promise<any> {
    try {
      return this.carsService.findAll();
    } catch (e) {
      throw new Error(e);
    }
  }

  @UseGuards(RolesGuard)
  @Roles(RoleName.ADMIN, RoleName.CAROWNER)
  @Get(':id')
  findOneById(
    @GetCurrentUser() currentUser: any,
    @Param('id') id: number,
  ): Promise<any> {
    try {
      return this.carsService.findOne(+id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateCarDto: UpdateCarDto,
  ): Promise<any> {
    try {
      return this.carsService.update(+id, updateCarDto);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<any> {
    try {
      return this.carsService.remove(+id);
    } catch (e) {
      throw new Error(e);
    }
  }
}
