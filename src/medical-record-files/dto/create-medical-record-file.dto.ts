import { IsInt, IsUrl, IsOptional, IsString } from 'class-validator';

export class CreateMedicalRecordFileDto {
  @IsInt()
  medicalRecordId: number;

  @IsUrl()
  url: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  fileType?: string;
}
