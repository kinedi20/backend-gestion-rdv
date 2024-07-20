import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id: id });
  }
  //inscription
  async create(user: User): Promise<{ message: string; success: boolean }> {
    try {
      //rechercher le user
      const user_exist = await this.usersRepository.findOne({
        where: { email: user.email },
      });

      //si le user existe
      if (user_exist) {
        return { message: "L'email existe deja", success: false };
      }

      //cryptage du password
      const motDePasse_a_hasher = await bcrypt.genSalt(10);
      const motDePsse_hasher = await bcrypt.hash(
        user.password,
        motDePasse_a_hasher,
      );
      user.password = motDePsse_hasher;

      //creation d'un nouveau user
      const nouveau_user = await this.usersRepository.create(user);
      console.log(user);

      this.usersRepository.save(nouveau_user);

      return { message: 'Compte cree avec succee', success: true };
    } catch (error) {
      console.log(error);
      return {
        message: 'Erreur lors de la creation de compte',
        success: false,
      };
    }

    // async remove(id: number): Promise<void> {
    //   await this.usersRepository.delete(id);
    // }
  }

  //Connexion
  async connexion(
    user: User,
  ): Promise<{ message: string; success: boolean }> {
    try {
      //Rechercher le user
      const user_exist = await this.usersRepository.findOne({
        where: { email: user.email },
      });

      //Si le user n'existe pas
      if (!user_exist) {
        return {
          message: "L'email ou mot de passe est incorrect",
          success: false,
        };
      }

      //Re-vérifier mot de passe
      const verifier_motDePasse = await bcrypt.compare(
        user.password,
        user_exist.password,
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

}
