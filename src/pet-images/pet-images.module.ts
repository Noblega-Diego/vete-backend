import { Module } from '@nestjs/common';
import { PetImagesController } from './pet-images.controller';
import { PetImagesService } from './pet-images.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PetImagesController],
  providers: [PetImagesService],
})
export class PetImagesModule {}
