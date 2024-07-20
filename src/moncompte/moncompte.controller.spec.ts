import { Test, TestingModule } from '@nestjs/testing';
import { MoncompteController } from './moncompte.controller';

describe('MoncompteController', () => {
  let controller: MoncompteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoncompteController],
    }).compile();

    controller = module.get<MoncompteController>(MoncompteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
