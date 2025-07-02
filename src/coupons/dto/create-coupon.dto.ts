import { IsString, IsOptional, IsEnum, IsNumber, IsInt, IsDateString } from 'class-validator';

export enum DiscountType {
  PERCENTAGE = 'PERCENTAGE',
  AMOUNT = 'AMOUNT',
}

export class CreateCouponDto {
  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(DiscountType)
  discountType: DiscountType;

  @IsNumber()
  discountValue: number;

  @IsOptional()
  @IsInt()
  maxUses?: number;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;

  @IsOptional()
  isActive?: boolean;
}
