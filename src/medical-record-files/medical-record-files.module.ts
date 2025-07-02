import { Module } from '@nestjs/common';
import { MedicalRecordFilesController } from './medical-record-files.controller';
import { MedicalRecordFilesService } from './medical-record-files.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MedicalRecordFilesController],
  providers: [MedicalRecordFilesService],
})
export class MedicalRecordFilesModule {}
