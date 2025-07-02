import { IsInt, IsOptional, IsDateString, IsString } from 'class-validator';

export class UpdateMedicalRecordDto {
  @IsOptional()
  @IsInt()
  petId?: number;

  @IsOptional()
  @IsInt()
  appointmentId?: number;

  @IsOptional()
  @IsDateString()
  visitDate?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
