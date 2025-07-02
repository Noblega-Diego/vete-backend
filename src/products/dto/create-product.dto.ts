import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsInt, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Collar para perro' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Collar ajustable de nylon', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 199.99 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 10 })
  @IsInt()
  @Min(0)
  stock: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  categoryId: number;
}
