import { Test, TestingModule } from '@nestjs/testing';

import { CarImagesController } from './car-images.controller';
import { CarImagesService } from './car-images.service';

describe('CarImagesController', () => {
  let controller: CarImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarImagesController],
      providers: [CarImagesService],
    }).compile();

    controller = module.get<CarImagesController>(CarImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
