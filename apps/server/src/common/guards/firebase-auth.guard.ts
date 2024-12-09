import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { FirebaseService } from '../../app/firebase/firebase.service';
import { UsersService } from '../../app/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly usersService: UsersService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Observable<boolean> | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    return this.validateToken(token, context);
  }

  async validateToken(
    token: string,
    context: ExecutionContext,
  ): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();

      const firebaseUser = await this.firebaseService.verifyIdToken(token);

      const user = await this.usersService.getUserByUId(firebaseUser.uid);

      if (!user)
        throw new NotFoundException(
          `User with id ${firebaseUser.uid} not found`,
        );

      request.user = user;

      return true;
    } catch (err) {
      this.logger.error(`An error occured ${err}`);
      return false;
    }
  }
}
