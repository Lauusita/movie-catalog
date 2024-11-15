import {
  IsString,
  IsEmail,
  MinLength,
} from "class-validator";

import { User } from "@prisma/client";

export class CreateUserDto implements Partial<User> {
  @IsString()
  name: string;
  
  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}