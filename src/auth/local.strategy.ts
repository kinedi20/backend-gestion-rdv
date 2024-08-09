import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: string, password: string): Promise<any> {
    console.log('validate LocalStrategy', email);

    const user = await this.authService.validateUser(email, password);
    console.log('LocalStrategy', user);

    if (!user) {
      throw new UnauthorizedException();
    }
    console.log('LocalStrategy', user);

    return user;
  }
}
