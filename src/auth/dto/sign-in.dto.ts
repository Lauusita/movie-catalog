import { IsEmail, IsString, Min, MinLength } from "class-validator";
import { CreateUserDto } from "./create-user.dto";

export class SignInDto implements Partial<CreateUserDto> {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;
}