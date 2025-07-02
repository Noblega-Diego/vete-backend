import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMedicalRecordFileDto } from './dto/create-medical-record-file.dto';
import { UpdateMedicalRecordFileDto } from './dto/update-medical-record-file.dto';

@Injectable()
export class MedicalRecordFilesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateMedicalRecordFileDto) {
    return this.prisma.medicalRecordFile.create({ data });
  }

  async findAll() {
    return this.prisma.medicalRecordFile.findMany({ where: { deleted: false }, include: { medicalRecord: true } });
  }

  async findOne(id: number) {
    const file = await this.prisma.medicalRecordFile.findUnique({ where: { id, deleted: false }, include: { medicalRecord: true } });
    if (!file) throw new NotFoundException('Archivo de ficha médica no encontrado');
    return file;
  }

  async update(id: number, data: UpdateMedicalRecordFileDto) {
    await this.findOne(id);
    return this.prisma.medicalRecordFile.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.medicalRecordFile.update({ where: { id }, data: { deleted: true } });
  }
}
