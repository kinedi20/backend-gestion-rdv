import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Rdv } from './rdv.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  profession: string

  @OneToMany(() => Rdv, rdv => rdv.user)
  rdvs: Rdv[];

}