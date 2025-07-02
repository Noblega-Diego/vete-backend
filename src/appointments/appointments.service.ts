import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAppointmentDto) {
    return this.prisma.appointment.create({ data });
  }

  async findAll() {
    return this.prisma.appointment.findMany({
      where: { deleted: false },
      include: {
        client: true,
        pet: true,
        serviceType: true,
        medicalRecords: true,
      },
    });
  }

  async findOne(id: number) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id, deleted: false },
      include: {
        client: true,
        pet: true,
        serviceType: true,
        medicalRecords: true,
      },
    });
    if (!appointment) throw new NotFoundException('Cita no encontrada');
    return appointment;
  }

  async update(id: number, data: UpdateAppointmentDto) {
    await this.findOne(id);
    return this.prisma.appointment.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.appointment.update({
      where: { id },
      data: { deleted: true },
    });
  }
}
