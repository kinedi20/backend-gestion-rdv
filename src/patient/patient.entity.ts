import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Rdv } from '../rdv/rdv.entity';
import { Medecin } from 'src/medecin/medecin.entity';

@Entity()
export class Patient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @Column()
    prenom: string;

    @Column()
    age: number;

    @Column()
    adresse: string;

    @Column()
    telephone: number;


    @ManyToOne(() => Medecin, medecin => medecin.patients)
    medecin: Medecin;

    @OneToMany(() => Rdv, rdv => rdv.patient)
    rendezVous: Rdv[];
}
