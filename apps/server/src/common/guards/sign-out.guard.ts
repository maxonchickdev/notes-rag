import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SignOutGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Observable<boolean> | Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    request.headers.authorization = '';

    return true;
  }
}
