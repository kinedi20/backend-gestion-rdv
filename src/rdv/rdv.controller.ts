import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { RdvService } from './rdv.service';
import { Rdv } from './rdv.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('rdvs')
// @UseGuards(JwtAuthGuard)

export class RdvController {
  constructor(private readonly rdvService: RdvService) {}

  @Get()
  findAll(): Promise<Rdv[]> {
    return this.rdvService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Rdv> {
    return this.rdvService.findOne(id);
  }

  @Post()
  create(@Body() rdv: Rdv) {
    return this.rdvService.create(rdv);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() rdv: Rdv): Promise<Rdv> {
    return this.rdvService.update(id, rdv);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.rdvService.remove(id);
  }
}