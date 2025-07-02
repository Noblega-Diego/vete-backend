import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Injectable()
export class PetsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePetDto) {
    return this.prisma.pet.create({ data });
  }

  async findAll() {
    return this.prisma.pet.findMany({ where: { deleted: false }, include: { images: true, medicalRecords: true, appointments: true, client: true } });
  }

  async findAllByClientId(clientId: number) {
    return this.prisma.pet.findMany({ where: { deleted: false, clientId }, include: { images: true, medicalRecords: true, appointments: true, client: true } });
  }

  async findAllByUserLinked(userId: number) {
    // Obtiene todas las mascotas de los clientes vinculados a este usuario
    // @ts-ignore
    const userClients = await this.prisma.userClients.findMany({ where: { userId } });
    const clientIds = userClients.map((uc: any) => uc.clientId);
    if (clientIds.length === 0) return [];
    return this.prisma.pet.findMany({
      where: { deleted: false, clientId: { in: clientIds } },
      include: { images: true, medicalRecords: true, appointments: true, client: true },
    });
  }

  async findOne(id: number) {
    const pet = await this.prisma.pet.findUnique({ where: { id, deleted: false }, include: { images: true, medicalRecords: true, appointments: true, client: true } });
    if (!pet) throw new NotFoundException('Mascota no encontrada');
    return pet;
  }

  async isPetLinkedToUser(petId: number, userId: number): Promise<boolean> {
    // @ts-ignore
    const userClients = await (this.prisma as any).userClient.findMany({ where: { userId } });
    const clientIds = userClients.map((uc: any) => uc.clientId);
    if (clientIds.length === 0) return false;
    const pet = await this.prisma.pet.findUnique({ where: { id: petId, deleted: false } });
    return !!pet && clientIds.includes(pet.clientId);
  }

  async update(id: number, data: UpdatePetDto) {
    await this.findOne(id);
    return this.prisma.pet.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.pet.update({ where: { id }, data: { deleted: true } });
  }
}
