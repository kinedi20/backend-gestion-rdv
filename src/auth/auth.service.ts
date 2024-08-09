import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MedecinService } from '../medecin/medecin.service';
import { Medecin } from '../medecin/medecin.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly medecinService: MedecinService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user: Medecin = await this.medecinService.findByEmail(email);
    console.log('validateUser user', user);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isMatch: boolean = bcrypt.compareSync(password, user.motDePasse);
    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }
    console.log('user', user);

    return user;
  }

  async login(user: any) {
    console.log('login AuthServiceAuthService', user);

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: user
    };
  }
}