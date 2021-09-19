import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class GuestGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token: string = request.headers['x-auth-token'];
    
    if (token) return false;

    return true;
  }
}
