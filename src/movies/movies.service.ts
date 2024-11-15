import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Movie } from '@prisma/client';

@Injectable()
export class MoviesService {

  constructor(private readonly prisma: PrismaService, private readonly cloudinary: CloudinaryService){}
  async create(createMovieDto: any, file: Buffer): Promise<Movie | any> { // juan no me pegues por el any
    try {
      const image = (await this.cloudinary.uploadImage(file)).url;
      return await this.prisma.movie.create({ data: { 
        ...createMovieDto, image
      }})
    } catch (error) {
        throw new Error(error.message) 
    }
  }

  async findAll(): Promise<Movie[]> {
    return this.prisma.movie.findMany()
  }

  async findOne(id: string): Promise<Movie> {
    try {
      const movie = await this.prisma.movie.findUnique({ where: { id }})
      if (!movie) throw new NotFoundException("Movie doesn't exist")
      return movie
    } catch (error) {
      throw error
    }
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
  
}
