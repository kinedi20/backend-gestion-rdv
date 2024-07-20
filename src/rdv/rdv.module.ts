import { Module } from '@nestjs/common';
import { RdvService } from './rdv.service';
import { RdvController } from './rdv.controller';
import { Rdv } from 'src/Entities/rdv.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Rdv])],
  providers: [RdvService],
  controllers: [RdvController]
})
export class RdvModule {}
