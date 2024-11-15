import {
  IsString,
  IsEmail,
  IsEnum,
  MinLength,
} from "class-validator";

import { User } from "@prisma/client";
import { ROLE } from "../constants";

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
  
  @IsEnum(ROLE)
  role: ROLE
}