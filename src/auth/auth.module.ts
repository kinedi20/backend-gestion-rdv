import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medecin } from '../medecin/medecin.entity';
import { MedecinService } from '../medecin/medecin.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'yourSecretKey', 
      signOptions: { expiresIn: '60m' },
    }),
    TypeOrmModule.forFeature([Medecin]),
  ],
  providers: [AuthService, JwtStrategy, MedecinService, LocalStrategy],
  exports: [AuthService, MedecinService],
  controllers: [AuthController],
})
export class AuthModule { }