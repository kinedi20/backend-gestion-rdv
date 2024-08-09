import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Put, UseGuards} from '@nestjs/common';
import { MedecinService } from './medecin.service';
import { Medecin } from './medecin.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Controller('medecin')
// @UseGuards(JwtAuthGuard)

export class MedecinController {
  constructor(private readonly medecinService: MedecinService) {}

  @Get()
  findAll(): Promise<Medecin[]> {
    return this.medecinService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Medecin> {
    return this.medecinService.findOne(id);
  }

  //inscription
  @Post()
  create(@Body() medecin: Medecin) {
    return this.medecinService.create(medecin);
  }

  //connexion

  @Post('connexion')
  async connexion(@Body() medecin: Medecin) {
    const resultat_de_connexion = await this.medecinService.connexion(medecin);

    return resultat_de_connexion;
  }

//modifier selon Id
@Put(':id')
async update(@Param('id') id: string, @Body() updateData: Partial<Medecin>) {
  try {
    const result = await this.medecinService.update(Number(id), updateData);
    return result;
  } catch (error) {
    throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
//modifier selon Id
@Patch(':id')
async partialUpdate(@Param('id') id: string, @Body() updateData: Partial<Medecin>) {
  try {
    const result = await this.medecinService.update(Number(id), updateData);
    return result;
  } catch (error) {
    throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
  //supprimer un medecin
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.medecinService.remove(id);
  }
}
