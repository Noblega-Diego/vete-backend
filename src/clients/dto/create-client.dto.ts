import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail } from 'class-validator';

export class CreateClientDto {
  @ApiProperty({ example: 'Juan Pérez' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'juan@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+5491122334455', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'Calle Falsa 123', required: false })
  @IsOptional()
  @IsString()
  address?: string;
}
