import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';

@Injectable()
export class MedicalRecordsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateMedicalRecordDto) {
    return this.prisma.medicalRecord.create({ data });
  }

  async findAll() {
    return this.prisma.medicalRecord.findMany({ where: { deleted: false }, include: { files: true, pet: true, appointment: true } });
  }

  async findOne(id: number) {
    const record = await this.prisma.medicalRecord.findUnique({ where: { id, deleted: false }, include: { files: true, pet: true, appointment: true } });
    if (!record) throw new NotFoundException('Ficha médica no encontrada');
    return record;
  }

  async update(id: number, data: UpdateMedicalRecordDto) {
    await this.findOne(id);
    return this.prisma.medicalRecord.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.medicalRecord.update({ where: { id }, data: { deleted: true } });
  }
}
