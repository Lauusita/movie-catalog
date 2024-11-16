import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Movie, Prisma } from '@prisma/client';

@Injectable()
export class MoviesService {

  constructor(private readonly prisma: PrismaService, private readonly cloudinary: CloudinaryService){}
  async create(createMovieDto: CreateMovieDto, file: Buffer) {
    try {
      const image = (await this.cloudinary.uploadImage(file)).url;
      await this.prisma.movie.create({ data: { 
        ...createMovieDto,
        image
      }})

      return { msg: "Movie created successfully" }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException("The body of the request is invalid. Please check your input fields.")
      }
      throw new InternalServerErrorException('An unexpected error occurred while creating the movie.');
    }
  }

  async findAll(): Promise<Movie[]> {
    const movies = await this.prisma.movie.findMany()
    if (movies.length === 0) throw new NotFoundException("No movies found ")
    return movies
  }

  async findOne(id: string): Promise<Movie> {
    try {
      const movie = await this.prisma.movie.findUnique({ where: { id }})
      if (!movie) throw new NotFoundException("Movie was not found")
      return movie
    } catch (error) {
      throw error
    }
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    try {
      await this.prisma.movie.update({ 
        where: { id }, 
        data: {
          ...updateMovieDto,
        }
      })
      return { msg: "movie updated successfully"}
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new NotFoundException("Movie was not found")
      }
      throw new InternalServerErrorException('An unexpected error occurred while updating the movie.');
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.movie.delete({ where: { id } })
      return { msg: "Movie deleted successfully"}
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new NotFoundException("Movie was not found")
      }
      throw new InternalServerErrorException('An unexpected error occurred while deleting the movie.');
    }
  }
}
