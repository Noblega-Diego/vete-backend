import { IsInt, IsUrl, IsOptional, IsString } from 'class-validator';

export class UpdatePetImageDto {
  @IsOptional()
  @IsInt()
  petId?: number;

  @IsOptional()
  @IsUrl()
  url?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  order?: number;
}
