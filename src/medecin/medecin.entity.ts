import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Rdv } from '../rdv/rdv.entity';
import { Patient } from 'src/patient/patient.entity';

@Entity()
export class Medecin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @Column()
    prenom: string;

    @Column()
    email: string;

    @Column()
    telephone: string;


    @Column()
    motDePasse: string;

    @Column()
    profession: string

    @OneToMany(() => Patient, patient => patient.medecin)
    patients: Patient[];

    @OneToMany(() => Rdv, rdv => rdv.medecin)
    rendezVous: Rdv[];



}