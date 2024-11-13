import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidateAuth } from './pipes/login.pipe';
import { ValidateSignIn } from './pipes/signIn.pipe';
import { AuthUser } from './interfaces/User';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UsePipes(ValidateAuth)
  async login(@Body() data: CreateUserDto): Promise<AuthUser>{
    try {
      const token = await this.authService.login(data.username, data.password);
      return token 
    } catch (error) {
      throw error
    }
  } 

  @Post("create")
  @UsePipes(ValidateSignIn)
  async signIn(@Body() data: CreateUserDto) {
    return await this.authService.signIn(data.username, data.password);
  }
}
