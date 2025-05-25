import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { PayloadType } from '../constants/types';
import UserRole from 'src/users/constants/user-role';

@Injectable()
export class AdminJwtGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest<TUser = any>(err: any, user: PayloadType): TUser {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    console.log(user);

    if (user.role === (UserRole.INSTRUKTUR as string)) {
      return user as TUser;
    }
    throw err || new UnauthorizedException();
  }
}
