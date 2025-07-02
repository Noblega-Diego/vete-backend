import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsInt, Min } from 'class-validator';

export class UpdateProductDto {
  @ApiPropertyOptional({ example: 'Collar para perro' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'Collar ajustable de nylon' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 199.99 })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsInt()
  @Min(0)
  stock?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  categoryId?: number;
}
