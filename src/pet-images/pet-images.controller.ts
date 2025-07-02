import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { PetImagesService } from './pet-images.service';
import { CreatePetImageDto } from './dto/create-pet-image.dto';
import { UpdatePetImageDto } from './dto/update-pet-image.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('pet-images')
export class PetImagesController {
  constructor(private readonly petImagesService: PetImagesService) {}

  @Post()
  create(@Body() dto: CreatePetImageDto) {
    return this.petImagesService.create(dto);
  }

  @Get()
  findAll() {
    return this.petImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.petImagesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePetImageDto) {
    return this.petImagesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.petImagesService.remove(id);
  }
}
