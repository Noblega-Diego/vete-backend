import { IsString, IsOptional, IsInt } from 'class-validator';

export class UpdateServiceTypeDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  durationMin?: number;
}
