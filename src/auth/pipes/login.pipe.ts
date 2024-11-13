import { ArgumentMetadata, Injectable, NotFoundException, PipeTransform, UnauthorizedException } from "@nestjs/common";
import { compare } from 'bcrypt'
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ValidateAuth implements PipeTransform {
  constructor(private readonly prisma: PrismaService){}

  async transform(value: any, metadata: ArgumentMetadata) {
    const { username, password } = value
    
    const user = await this.prisma.user.findUnique({ where: { username }})
    
    if (user === null) throw new NotFoundException('Usuario no existe');
    
    const verifyPassword = await compare(password, user.password)

    if ( !verifyPassword ) throw new UnauthorizedException('Contraseña incorrecta')
    return value
  }
}