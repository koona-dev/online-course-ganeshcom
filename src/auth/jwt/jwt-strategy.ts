import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { authConstants } from '../constants/auth.constant';
import { PayloadType } from '../constants/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConstants.secret,
    });
  }

  validate(payload: PayloadType) {
    return {
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    };
  }
}
