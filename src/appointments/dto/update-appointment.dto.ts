import { IsDateString, IsInt, IsOptional, IsString, IsEnum } from 'class-validator';
import { AppointmentStatus } from './create-appointment.dto';

export class UpdateAppointmentDto {
  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsEnum(AppointmentStatus)
  status?: AppointmentStatus;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsInt()
  durationMin?: number;

  @IsOptional()
  @IsInt()
  clientId?: number;

  @IsOptional()
  @IsInt()
  petId?: number;

  @IsOptional()
  @IsInt()
  serviceTypeId?: number;
}
