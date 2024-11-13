import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import jwtEnv from "./constants"
import { PrismaService } from 'src/prisma/prisma.service';
import { ValidateAuth } from './pipes/login.pipe';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtEnv.secret,
      global: true
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, ValidateAuth],
})
export class AuthModule {}
