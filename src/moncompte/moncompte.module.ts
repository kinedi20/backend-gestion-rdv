import { Module } from '@nestjs/common';
import { MoncompteController } from './moncompte.controller';
import { MoncompteService } from './moncompte.service';

@Module({
  controllers: [MoncompteController],
  providers: [MoncompteService]
})
export class MoncompteModule {}
