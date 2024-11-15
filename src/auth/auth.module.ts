import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { ValidateAuth } from './pipes/login.pipe';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      global: true,
      signOptions: {
        expiresIn: "1h" // se detalla el tiempo de expiración del token
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, ValidateAuth],
})
export class AuthModule {}
