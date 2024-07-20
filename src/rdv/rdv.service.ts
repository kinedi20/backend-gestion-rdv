import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rdv } from 'src/Entities/rdv.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RdvService {
  constructor(
    @InjectRepository(Rdv)
    private rdvRepository: Repository<Rdv>,
  ) {}

  findAll(): Promise<Rdv[]> {
    return this.rdvRepository.find();
  }

  findOne(id: number): Promise<Rdv> {
    return this.rdvRepository.findOneBy({ idRdv: id });
  }

  async create_rdv(rdv: Rdv): Promise<{ message: string; success: boolean }> {
    try {
      const nouveau_rdv = await this.rdvRepository.create(rdv);
      console.log(rdv);

      this.rdvRepository.save(nouveau_rdv);

      return {
        message: 'Votre rendez-vous a été bien prise en compte',
        success: true,
      };
    } catch (error) {
      console.log(error);
      return {
        message: 'Erreur lors de la creation de rendez-vous',
        success: false,
      };
    }
  }
}
