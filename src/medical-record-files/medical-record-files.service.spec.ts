import { Test, TestingModule } from '@nestjs/testing';
import { MedicalRecordFilesService } from './medical-record-files.service';

describe('MedicalRecordFilesService', () => {
  let service: MedicalRecordFilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicalRecordFilesService],
    }).compile();

    service = module.get<MedicalRecordFilesService>(MedicalRecordFilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
