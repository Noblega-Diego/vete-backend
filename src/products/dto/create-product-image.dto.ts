import { IsString, IsOptional, IsInt, IsUrl, Min } from 'class-validator';

export class CreateProductImageDto {
  @IsInt()
  productId: number;

  @IsUrl()
  url: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  order?: number;
}
