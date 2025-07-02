import { Test, TestingModule } from '@nestjs/testing';
import { MedicalRecordFilesController } from './medical-record-files.controller';

describe('MedicalRecordFilesController', () => {
  let controller: MedicalRecordFilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalRecordFilesController],
    }).compile();

    controller = module.get<MedicalRecordFilesController>(MedicalRecordFilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
