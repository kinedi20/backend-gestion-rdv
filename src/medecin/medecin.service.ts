import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medecin } from './medecin.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MedecinService {
  constructor(
    @InjectRepository(Medecin)
    private medecinsRepository: Repository<Medecin>,
    private jwtService: JwtService
  ) { }

  findAll(): Promise<Medecin[]> {
    return this.medecinsRepository.find();
  }

  findOne(id: number): Promise<Medecin> {
    return this.medecinsRepository.findOneBy({ id: id });
  }

  async findByEmail(email: string): Promise<Medecin> {
    return await this.medecinsRepository.findOne({ where: { email } });
  }
  //inscription
  async create(
    medecin: Medecin,
  ): Promise<{ message: string; success: boolean }> {
    try {
      //rechercher le medecin
      const medecin_exist = await this.medecinsRepository.findOne({
        where: { email: medecin.email },
      });

      //si le medecin existe
      if (medecin_exist) {
        return { message: "L'email existe deja", success: false };
      }

      //cryptage du password
      const motDePasse_a_hasher = await bcrypt.genSalt(10);
      const motDePsse_hasher = await bcrypt.hash(
        medecin.motDePasse,
        motDePasse_a_hasher,
      );
      medecin.motDePasse = motDePsse_hasher;

      //creation d'un nouveau medecin
      const nouveau_medecin = await this.medecinsRepository.create(medecin);
      console.log(medecin);

      this.medecinsRepository.save(nouveau_medecin);

      return { message: 'Compte cree avec succee', success: true };
    } catch (error) {
      console.log(error);
      return {
        message: 'Erreur lors de la creation de compte',
        success: false,
      };
    }
  }

  //Connexion
  async connexion(
    medecin: Medecin,
  ): Promise<{ message: string; success: boolean }> {
    try {
      //Rechercher le user
      const medecin_exist = await this.medecinsRepository.findOne({
        where: { email: medecin.email },
      });

      //Si le user n'existe pas
      if (!medecin_exist) {
        return {
          message: "L'email ou mot de passe est incorrect",
          success: false,
        };
      }

      //Re-vérifier mot de passe
      const verifier_motDePasse = await bcrypt.compare(
        medecin.motDePasse,
        medecin_exist.motDePasse,
      );

      if (!verifier_motDePasse) {
        return {
          message: "L'email ou mot de passe est incorrect",
          success: false,
        };
      }

      return { message: 'Connexion reussie', success: true };
    } catch (error) {
      console.log('Echec de la connexion');
      return { message: 'Erreur lors de la connexion', success: false };
    }
  }

  async update(id: number, updateData: Partial<Medecin>): Promise<{ message: string, medecin?: Medecin }> {
    try {
      const medecin = await this.findOne(id);

      // Hacher le mot de passe si le champ motDePasse est présent
      if (updateData.motDePasse) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(updateData.motDePasse, salt);
        updateData.motDePasse = hashedPassword;
      }

      // Générer un nouveau token JWT si l'email ou le mot de passe a été modifié
      let accessToken;
      if (updateData) {
        // updateData.email || updateData.motDePasse || updateData.profession || updateData.nom || updateData.prenom
        const payload = { email: medecin.email, sub: medecin.id };
        accessToken = this.jwtService.sign(payload);
      }

      Object.assign(medecin, updateData);
      await this.medecinsRepository.save(medecin);
      return { message: 'Mise à jour aveec succès', medecin, ...(accessToken && { accessToken })}
      
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: number): Promise<void> {
    await this.medecinsRepository.delete(id);
  }
}
