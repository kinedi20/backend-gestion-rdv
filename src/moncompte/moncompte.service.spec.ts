import { Test, TestingModule } from '@nestjs/testing';
import { MoncompteService } from './moncompte.service';

describe('MoncompteService', () => {
  let service: MoncompteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoncompteService],
    }).compile();

    service = module.get<MoncompteService>(MoncompteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
