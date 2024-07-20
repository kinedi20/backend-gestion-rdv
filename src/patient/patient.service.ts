import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from 'src/Entities/patient.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PatientService {

    constructor(
        @InjectRepository(Patient)
        private patientRepository: Repository<Patient>,
      ) {}


      findAll(): Promise<Patient[]> {
        return this.patientRepository.find();
      }

      async create_patient(patient: Patient): Promise<{ message: string; success: boolean }> {
        try {
          const nouveau_patient = await this.patientRepository.create(patient);
          console.log(patient);
    
          this.patientRepository.save(nouveau_patient);
    
          return {
            message: 'Enregistrer avec succès',
            success: true,
          };
        } catch (error) {
          console.log(error);
          return {
            message: 'Erreur lors de la creation de patient',
            success: false,
          };
        }
      }
}
