import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { FirebaseService } from '../../app/firebase/firebase.service';
import { UsersService } from '../../app/user/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly usersService: UsersService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Observable<boolean> | Promise<boolean> {
    console.log('token');
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    console.log(request.headers);

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

      if (!user) {
        throw new NotFoundException('User not found');
      }

      request.user = user;

      return true;
    } catch (err) {
      return false;
    }
  }
}
