import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext
  ): Promise<boolean> {
    const prisma = new PrismaClient();
    const request = context.switchToHttp().getRequest();
    const token: string = request.headers['x-auth-token'];
    
    if (token === undefined){
      throw new UnauthorizedException('Harap login terlebih dahulu');
    }

    const user = await prisma.users.findFirst({
      select: {
        id: true,
        username: true
      },
     	where: {
				token: token 
			}
    });

    if (!user) {
      throw new UnauthorizedException('Harap login terlebih dahulu');
    }
    
    return true;
  }
}
