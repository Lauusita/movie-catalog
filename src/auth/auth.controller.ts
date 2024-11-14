import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidateAuth } from './pipes/login.pipe';
import { AuthUser } from './interfaces/User';
import { UniqueEmailPipe } from './pipes/sign-up.pipe';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UsePipes(ValidateAuth)
  async login(@Body() data: SignInDto): Promise<AuthUser>{
    try {
      const token = await this.authService.login(data);
      return token 
    } catch (error) {
      throw error
    }
  }

  @Post("create")
  @UsePipes(UniqueEmailPipe)
  async signUp(@Body() data: CreateUserDto) {
      return await this.authService.signUp(data);
  }
}
