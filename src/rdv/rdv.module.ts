import { Module } from '@nestjs/common';
import { RdvService } from './rdv.service';
import { RdvController } from './rdv.controller';

@Module({
  providers: [RdvService],
  controllers: [RdvController]
})
export class RdvModule {}
