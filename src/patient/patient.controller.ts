import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Patient } from 'src/patient/patient.entity';
import { PatientService } from './patient.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('patient')
// @UseGuards(JwtAuthGuard)
export class PatientController {

    constructor(private readonly patientService: PatientService) { }

    
    @Get()
    findAll(): Promise<Patient[]> {
        return this.patientService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Patient> {
      return this.patientService.findOne(id);
    }

    @Post()
    async create_patient(@Body() patient: Patient) {

        return this.patientService.create_patient(patient);
    }


    @Put(':id')
    update(@Param('id') id: number, @Body() patient: Patient): Promise<Patient> {
      return this.patientService.update(id, patient);
    }


    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
      return this.patientService.remove(id);
    }

}





