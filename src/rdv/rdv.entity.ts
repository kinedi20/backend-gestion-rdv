import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { Patient } from '../patient/patient.entity';
import { Medecin } from 'src/medecin/medecin.entity';

@Entity()
export class Rdv {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titre: string;

  @Column()
  avecQui: string;

  @Column()
  date: Date;

  @Column()
  heure: string;

  @Column()
  lieu: string;


  @ManyToOne(() => Medecin, medecin => medecin.rendezVous)
  medecin: Medecin;

  @ManyToOne(() => Patient, patient => patient.rendezVous)
  patient: Patient;


}