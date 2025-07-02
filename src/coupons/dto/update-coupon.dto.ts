import { IsString, IsOptional, IsEnum, IsNumber, IsInt, IsDateString } from 'class-validator';
import { DiscountType } from './create-coupon.dto';

export class UpdateCouponDto {
  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(DiscountType)
  discountType?: DiscountType;

  @IsOptional()
  @IsNumber()
  discountValue?: number;

  @IsOptional()
  @IsInt()
  maxUses?: number;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;

  @IsOptional()
  isActive?: boolean;
}
