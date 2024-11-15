import { ArgumentMetadata, BadRequestException, ConflictException, Injectable, PipeTransform } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UniqueEmailPipe implements PipeTransform {
  constructor(private readonly prisma: PrismaService){}

  async transform(value: any, metadata: ArgumentMetadata) {
    const { email } = value
    const user = await this.prisma.user.findUnique({ where: { email }})

    if ( user ) throw new BadRequestException('User with this email already exist');
    return value
  }
}