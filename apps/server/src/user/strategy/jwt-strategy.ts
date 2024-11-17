import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JWT_ACCESS_CONFIG } from '../../config/jwt-access.config';
import { PayloadDto } from '../dto/payload.dto';

export const JWT_STATEGY = 'jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT_STATEGY) {
  /**
   *
   * @param configService
   */
  constructor(private readonly configService: ConfigService) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req.cookies['access'];
        }
      ]),
      passReqToCallback: true,
      secretOrKey: configService.get<string>(`${JWT_ACCESS_CONFIG}.access.secret`),
    });
  }

  /**
   *
   * @param req
   * @param payloadDto
   */
  async validate(req: Request, payloadDto: PayloadDto): Promise<PayloadDto> {
    return {
      _id: payloadDto._id
    };
  }
}
