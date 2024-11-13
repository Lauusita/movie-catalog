import { ArgumentMetadata, ConflictException, Injectable, PipeTransform } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ValidateSignIn implements PipeTransform {
  constructor(private readonly prisma: PrismaService){}

  async transform(value: any, metadata: ArgumentMetadata) {
    const { username } = value
    const user = await this.prisma.user.findUnique({ where: { username }})

    if ( user ) throw new ConflictException('El usuario ya existe');
    return value
  }
}