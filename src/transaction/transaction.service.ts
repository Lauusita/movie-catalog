import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { TransactionDto } from './dto/transaction.dto';
import { MoviesService } from 'src/movies/movies.service';

@Injectable()
export class TransactionService {
  constructor(
    private prisma: PrismaService,
    private movieService: MoviesService
  ) {}

  async saveTransaction(transactionData: TransactionDto, userId: string) {
    try {
      await this.prisma.transaction.create({
        data: { 
          ...transactionData, 
          userId,
          transactionDate: new Date(),
        }
      });

      return { msg: `${transactionData.transactionType} created successfully`}
    } catch (error) {
      if ( error instanceof Prisma.PrismaClientKnownRequestError ) {
        throw new BadRequestException("Check if the user or movie id actually exists");
      }
      throw error
    }
  }
  
  async getRentedMovies(userId: string) {
    try { 
      const movies = await this.prisma.transaction.findMany({ where: { userId, transactionType: 'RENTAL' }})

      if (movies.length === 0) return []

      const moviesIds = movies.map( movie => movie.movieId )

      const movieDetails = Promise.all(
        moviesIds.map( async(id) => {
          return await this.movieService.findOne(id)
        })
      )

      return movieDetails
    } catch (error) {
      if ( error instanceof Prisma.PrismaClientUnknownRequestError) {
        throw new BadRequestException("error", error.message)
      }
      throw error
    }
  }

  async getPurchasedMovies(userId: string) {
    try { 
      const movies = await this.prisma.transaction.findMany({ where: { userId, transactionType: 'PURCHASE' }})

      if (movies.length === 0) return []

      const moviesIds = movies.map( movie => movie.movieId )

      const movieDetails = Promise.all(
        moviesIds.map( async(id) => {
          return await this.movieService.findOne(id)
        })
      )

      return movieDetails
    } catch (error) {
      if ( error instanceof Prisma.PrismaClientUnknownRequestError) {
        throw new BadRequestException( error.message)
      }
      throw error
    }
  }
}
