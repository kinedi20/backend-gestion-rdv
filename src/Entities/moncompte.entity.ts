import { Entity, PrimaryGeneratedColumn, Column,  OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class MonCompte {
    @PrimaryGeneratedColumn()
    idCompte: number;

    @Column()
    profCompte: string;


    @OneToOne(() => User)
    @JoinColumn()
    user: User;
}