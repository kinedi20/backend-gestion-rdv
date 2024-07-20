import { Entity, PrimaryGeneratedColumn, Column, ManyToOne  } from 'typeorm';
import { User } from './user.entity';
import { Patient } from './patient.entity';

@Entity()
export class Rdv {
    @PrimaryGeneratedColumn()
    idRdv: number;

    @Column()
    titreRdv: string;

    @Column()
    dateRdv: Date;

    @Column()
    heureRdv: string;

    @Column()
    lieuRdv: string;

    @ManyToOne(() => User, user => user.rdvs)
  user: User;

  @ManyToOne(() => Patient, patient => patient.rdvs)
  patient: Patient;

}