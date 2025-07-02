import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { MedicalRecordFilesService } from './medical-record-files.service';
import { CreateMedicalRecordFileDto } from './dto/create-medical-record-file.dto';
import { UpdateMedicalRecordFileDto } from './dto/update-medical-record-file.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('medical-record-files')
@UseGuards(JwtAuthGuard)
export class MedicalRecordFilesController {
  constructor(private readonly medicalRecordFilesService: MedicalRecordFilesService) {}

  @Post()
  create(@Body() dto: CreateMedicalRecordFileDto) {
    return this.medicalRecordFilesService.create(dto);
  }

  @Get()
  findAll() {
    return this.medicalRecordFilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.medicalRecordFilesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMedicalRecordFileDto) {
    return this.medicalRecordFilesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.medicalRecordFilesService.remove(id);
  }
}
