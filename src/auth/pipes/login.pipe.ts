import { ArgumentMetadata, Injectable, NotFoundException, PipeTransform, UnauthorizedException } from "@nestjs/common";
import { compare } from 'bcrypt'
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ValidateAuth implements PipeTransform {
  constructor(private readonly prisma: PrismaService){}

  async transform(value: any, metadata: ArgumentMetadata) {
    const { email, password } = value
    
    const user = await this.prisma.user.findUnique({ where: { email }})
    
    if (user === null) throw new NotFoundException('User with this email do not exist');
    
    const verifyPassword = await compare(password, user.password)

    if ( !verifyPassword ) throw new UnauthorizedException('Incorrect password')
    return value
  }
}