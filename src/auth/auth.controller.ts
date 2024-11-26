import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidateAuth } from './pipes/login.pipe';
import { UniqueEmailPipe } from './pipes/sign-up.pipe';
import { SignInDto } from './dto/sign-in.dto';
import { LoginResponse } from './interface/login-response.interface';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UsePipes(ValidateAuth)
  async login(@Body() data: SignInDto): Promise<LoginResponse>{
    try {
      const userInfo = await this.authService.login(data);
      return userInfo 
    } catch (error) {
      throw error
    }
  }

  @Post("create")
  @UsePipes(UniqueEmailPipe)
  async signUp(@Body() data: CreateUserDto) {
      return await this.authService.signUp(data);
  }

  @Get()
  @UseGuards(AuthGuard)
  verifyAuth() {
    return true
  }
}
