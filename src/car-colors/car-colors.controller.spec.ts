import { Test, TestingModule } from '@nestjs/testing';
import { CarColorsController } from './car-colors.controller';
import { CarColorsService } from './car-colors.service';

describe('CarColorsController', () => {
  let controller: CarColorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarColorsController],
      providers: [CarColorsService],
    }).compile();

    controller = module.get<CarColorsController>(CarColorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
