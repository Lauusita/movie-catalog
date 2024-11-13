import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthUser, User as IUser } from './interfaces/User';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { hashSync, compareSync, hash} from 'bcrypt'

@Injectable()
export class AuthService  {
  private saltRounds = 10;

  constructor(
    private prisma: PrismaService, 
    private readonly jwtService: JwtService
  ){}

  async login(username: string, password: string): Promise<AuthUser> {
    try {
      const user = await this.prisma.user.findUnique({ where: { username }})

      const payload = { username: user.username, sub: user.id };
      const token = await this.jwtService.signAsync(payload);
      
      return { token };
    } catch (error) {
      throw error
    }
  }

  async signIn(username: string, pass: string): Promise<User>{
    try {
      const password = await hash(pass, this.saltRounds)
      const newUser = await this.prisma.user.create({ data: { username, password }});
      
      return { ...newUser, password: pass};
    } catch (error) {
      throw error
    }
  }
}
