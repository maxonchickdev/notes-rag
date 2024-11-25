import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { JWT_STATEGY } from '../strategy/jwt-strategy';

/**
 *
 */
@Injectable()
export class JwtGuard extends AuthGuard(JWT_STATEGY) {}
