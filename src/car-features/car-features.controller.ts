import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CarFeaturesService } from './car-features.service';
import { CreateCarFeatureDto } from './dto/create-car-feature.dto';
import { UpdateCarFeatureDto } from './dto/update-car-feature.dto';

@ApiBearerAuth()
@ApiTags('Car Features')
@Controller('car-features')
export class CarFeaturesController {
  constructor(private readonly carFeaturesService: CarFeaturesService) {}

  @Post()
  create(@Body() createCarFeatureDto: CreateCarFeatureDto) {
    return this.carFeaturesService.create(createCarFeatureDto);
  }

  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.carFeaturesService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carFeaturesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarFeatureDto: UpdateCarFeatureDto) {
    return this.carFeaturesService.update(+id, updateCarFeatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carFeaturesService.remove(+id);
  }
}
