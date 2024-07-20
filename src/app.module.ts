import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Entities/user.entity';
import { RdvModule } from './rdv/rdv.module';
import { PatientModule } from './patient/patient.module';
import { Rdv } from './Entities/rdv.entity';
import { Patient } from './Entities/patient.entity';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'gestion_rdv',
      entities: [User, Rdv, Patient],
      synchronize: true,
    }),
    RdvModule,
    PatientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
