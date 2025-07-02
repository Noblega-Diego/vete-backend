import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, IsNumber } from 'class-validator';

export class UpdatePetDto {
  @ApiPropertyOptional({ example: 'Firulais' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'Perro' })
  @IsOptional()
  @IsString()
  species?: string;

  @ApiPropertyOptional({ example: 'Labrador' })
  @IsOptional()
  @IsString()
  breed?: string;

  @ApiPropertyOptional({ example: 3 })
  @IsOptional()
  @IsInt()
  age?: number;

  @ApiPropertyOptional({ example: 12.5 })
  @IsOptional()
  @IsNumber()
  weight?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  clientId?: number;
}
