import { Module } from '@nestjs/common';
import { MedecinController } from './medecin.controller';
import { MedecinService } from './medecin.service';
import { Medecin } from './medecin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule} from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Medecin]),     JwtModule.register({
    secret: 'mykey',
    signOptions: { expiresIn: '1h' },
  })],
  controllers: [MedecinController],
  providers: [MedecinService]
})
export class MedecinModule {}
