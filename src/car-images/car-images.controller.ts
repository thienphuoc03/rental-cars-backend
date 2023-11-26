import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CarImagesService } from './car-images.service';
import { CreateCarImageDto } from './dto/create-car-image.dto';
import { UpdateCarImageDto } from './dto/update-car-image.dto';

@ApiBearerAuth()
@ApiTags('car-images')
@Controller('car-images')
export class CarImagesController {
  constructor(private readonly carImagesService: CarImagesService) {}

  @Post()
  create(@Body() createCarImageDto: CreateCarImageDto) {
    return this.carImagesService.create(createCarImageDto);
  }

  @Get()
  findAll() {
    return this.carImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carImagesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCarImageDto: UpdateCarImageDto,
  ) {
    return this.carImagesService.update(+id, updateCarImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carImagesService.remove(+id);
  }
}
