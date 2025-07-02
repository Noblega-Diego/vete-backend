import { IsInt, IsUrl, IsOptional, IsString } from 'class-validator';

export class UpdateMedicalRecordFileDto {
  @IsOptional()
  @IsInt()
  medicalRecordId?: number;

  @IsOptional()
  @IsUrl()
  url?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  fileType?: string;
}
