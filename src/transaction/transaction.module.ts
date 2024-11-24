import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { MoviesService } from 'src/movies/movies.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService, PrismaService, MoviesService, CloudinaryService],
  imports: [CloudinaryModule]
})
export class TransactionModule {}
