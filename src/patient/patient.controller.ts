import { Body, Controller, Get, Post } from '@nestjs/common';
import { Patient } from 'src/Entities/patient.entity';
import { PatientService } from './patient.service';

@Controller('patient')
export class PatientController {

    constructor(private readonly patientService: PatientService) {}

    //liste des patients
    @Get()
    findAll(): Promise<Patient[]> {
      return this.patientService.findAll();
    }

    //créer un patient
    @Post()
    async create_patient(@Body() patient: Patient) {

            return this.patientService.create_patient(patient);
            }

    }


  


