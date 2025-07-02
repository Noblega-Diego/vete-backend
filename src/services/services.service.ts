import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceTypeDto } from './dto/create-service-type.dto';
import { UpdateServiceTypeDto } from './dto/update-service-type.dto';

@Injectable()
export class ServicesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateServiceTypeDto) {
    return this.prisma.serviceType.create({ data });
  }

  async findAll() {
    return this.prisma.serviceType.findMany({ where: { deleted: false }, include: { appointments: true } });
  }

  async findOne(id: number) {
    const service = await this.prisma.serviceType.findUnique({ where: { id, deleted: false }, include: { appointments: true } });
    if (!service) throw new NotFoundException('Tipo de servicio no encontrado');
    return service;
  }

  async update(id: number, data: UpdateServiceTypeDto) {
    await this.findOne(id);
    return this.prisma.serviceType.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.serviceType.update({ where: { id }, data: { deleted: true } });
  }
}
