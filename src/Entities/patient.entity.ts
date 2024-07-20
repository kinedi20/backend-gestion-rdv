import { Entity, PrimaryGeneratedColumn, Column,  OneToMany  } from 'typeorm';
import { Rdv } from './rdv.entity';

@Entity()
export class Patient {
    @PrimaryGeneratedColumn()
    idPatient: number;

    @Column()
    nomPatient: string;

    @Column()
    prenomPatient: string;

    @Column()
    agePatient: number;

    @Column()
    adrPatient: string;

    @Column()
    telPatient: number;

    @OneToMany(() => Rdv, rdv => rdv.patient)
  rdvs: Rdv[];
}
