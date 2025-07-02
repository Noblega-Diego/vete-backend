import { Test, TestingModule } from '@nestjs/testing';
import { PetImagesService } from './pet-images.service';

describe('PetImagesService', () => {
  let service: PetImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetImagesService],
    }).compile();

    service = module.get<PetImagesService>(PetImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
