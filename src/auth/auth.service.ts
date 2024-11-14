import { Injectable } from '@nestjs/common';
import { AuthUser, User as IUser } from './interfaces/User';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcrypt'
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService  {
  private saltRounds = 10;

  constructor(
    private prisma: PrismaService, 
    private readonly jwtService: JwtService
  ){}

  async login({ email }: SignInDto): Promise<AuthUser> {
    try {
      const user = await this.prisma.user.findUnique({ where: { email }})

      const payload = { email: user.email, sub: user.id };
      const token = await this.jwtService.signAsync(payload);
      
      return { token };
    } catch (error) {
      throw error
    }
  }

  async signUp({password: pass, ...userData}: CreateUserDto): Promise<Partial<User>>{
    const password = await hash(pass, this.saltRounds)
    const newUser = await this.prisma.user.create({
      data: {
        ...userData,
        password
      },
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true,
        password: true
      }
    });
    
    return newUser;
  }
}
