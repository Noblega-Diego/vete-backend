import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, IsNumber } from 'class-validator';

export class CreatePetDto {
  @ApiProperty({ example: 'Firulais' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Perro' })
  @IsString()
  species: string;

  @ApiProperty({ example: 'Labrador', required: false })
  @IsOptional()
  @IsString()
  breed?: string;

  @ApiProperty({ example: 3, required: false })
  @IsOptional()
  @IsInt()
  age?: number;

  @ApiProperty({ example: 12.5, required: false })
  @IsOptional()
  @IsNumber()
  weight?: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  clientId: number;
}
