import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService){}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(
    context: ExecutionContext,
  ):  Promise<boolean>  {
    const req = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(req)

    if (!token)
      throw new UnauthorizedException('Must provide a token for this request')

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET
      })
      
      req['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid Token');
    }
    return true
  }
}
