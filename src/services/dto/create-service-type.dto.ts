import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateServiceTypeDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  durationMin: number;
}
