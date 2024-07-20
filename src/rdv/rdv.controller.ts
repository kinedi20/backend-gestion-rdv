import { Body, Controller, Get, Post } from '@nestjs/common';
import { RdvService } from './rdv.service';
import { Rdv } from 'src/Entities/rdv.entity';

@Controller('rdv')
export class RdvController {

    constructor(private rdvService : RdvService){}

    //liste des rendez vous

    @Get()
    findAll(): Promise<Rdv[]> {
      return this.rdvService.findAll();
    }

    //Ajouter nouveau rendez-vous
    @Post()
    async create_rdv(@Body() rdv: Rdv) {

      return this.rdvService.create_rdv(rdv);
      }
    
}
