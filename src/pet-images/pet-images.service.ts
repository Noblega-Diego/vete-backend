import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePetImageDto } from './dto/create-pet-image.dto';
import { UpdatePetImageDto } from './dto/update-pet-image.dto';

@Injectable()
export class PetImagesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePetImageDto) {
    return this.prisma.petImage.create({ data });
  }

  async findAll() {
    return this.prisma.petImage.findMany({ where: { deleted: false }, include: { pet: true } });
  }

  async findOne(id: number) {
    const image = await this.prisma.petImage.findUnique({ where: { id, deleted: false }, include: { pet: true } });
    if (!image) throw new NotFoundException('Imagen de mascota no encontrada');
    return image;
  }

  async update(id: number, data: UpdatePetImageDto) {
    await this.findOne(id);
    return this.prisma.petImage.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.petImage.update({ where: { id }, data: { deleted: true } });
  }
}
