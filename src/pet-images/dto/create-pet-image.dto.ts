import { IsInt, IsUrl, IsOptional, IsString } from 'class-validator';

export class CreatePetImageDto {
  @IsInt()
  petId: number;

  @IsUrl()
  url: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  order?: number;
}
