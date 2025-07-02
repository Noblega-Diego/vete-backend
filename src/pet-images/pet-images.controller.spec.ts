import { Test, TestingModule } from '@nestjs/testing';
import { PetImagesController } from './pet-images.controller';

describe('PetImagesController', () => {
  let controller: PetImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PetImagesController],
    }).compile();

    controller = module.get<PetImagesController>(PetImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
