import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Rdv } from './rdv.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RdvService {
  constructor(
    @InjectRepository(Rdv)
    private rdvRepository: Repository<Rdv>
  ) {}

  findAll(): Promise<Rdv[]> {
    return this.rdvRepository.find({
      relations: ['patient', 'medecin'],
    });
  }

  findOne(id: number): Promise<Rdv> {
    return this.rdvRepository.findOneBy({id});
  }


  async create(rdv: Rdv): Promise<{ message: string; success: boolean }> {

    try {
      const nouveau_rdv = await this.rdvRepository.create(rdv);
      console.log(rdv);

      this.rdvRepository.save(nouveau_rdv);

      return {
        message: 'Votre rendez-vous a été enregistré avec succès',
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

  async remove(id: number): Promise<void> {
    await this.rdvRepository.delete(id);
  }

  async update(id: number, rdv: Rdv): Promise<Rdv> {
    await this.rdvRepository.update(id, rdv);
    return this.findOne(id);
}
}