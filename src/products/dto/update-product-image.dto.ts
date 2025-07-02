import { IsString, IsOptional, IsInt, IsUrl, Min } from 'class-validator';

export class UpdateProductImageDto {
  @IsOptional()
  @IsInt()
  productId?: number;

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
