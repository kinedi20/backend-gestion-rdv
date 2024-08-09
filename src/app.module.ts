import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RdvModule } from './rdv/rdv.module';
import { PatientModule } from './patient/patient.module';
import { Rdv } from './rdv/rdv.entity';
import { Patient } from './patient/patient.entity';
import { MedecinModule } from './medecin/medecin.module';
import { Medecin } from './medecin/medecin.entity';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    MedecinModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'gestion_rdv',
      entities: [Medecin, Rdv, Patient],
      synchronize: true,
    }),
    RdvModule,
    PatientModule,
    MedecinModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
