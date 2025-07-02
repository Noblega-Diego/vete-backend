import { IsDateString, IsInt, IsOptional, IsString, IsEnum } from 'class-validator';

export enum AppointmentStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

export class CreateAppointmentDto {
  @IsDateString()
  date: string;

  @IsOptional()
  @IsString()
  reason?: string;

  @IsEnum(AppointmentStatus)
  status?: AppointmentStatus;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsInt()
  durationMin: number;

  @IsInt()
  clientId: number;

  @IsInt()
  petId: number;

  @IsInt()
  serviceTypeId: number;
}
