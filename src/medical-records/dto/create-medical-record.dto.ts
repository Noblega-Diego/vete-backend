import { IsInt, IsOptional, IsDateString, IsString } from 'class-validator';

export class CreateMedicalRecordDto {
  @IsInt()
  petId: number;

  @IsOptional()
  @IsInt()
  appointmentId?: number;

  @IsDateString()
  visitDate: string;

  @IsString()
  notes: string;
}
