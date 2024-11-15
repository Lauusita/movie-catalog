import { IsEmail, IsString, Min } from "class-validator";
import { CreateUserDto } from "./create-user.dto";

export class SignInDto implements Partial<CreateUserDto> {
    @IsEmail()
    email: string;

    @IsString()
    @Min(6)
    password: string;

}