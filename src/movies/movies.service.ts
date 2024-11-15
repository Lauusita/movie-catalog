import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService, private readonly cloudinary: CloudinaryService){}
  async create(createMovieDto: CreateMovieDto) {
    try {
      return this.prisma.movie.create({ data: { 
        ...createMovieDto
      }})
    } catch (error) {
      throw error
    }
  }

  async uploadFile(id: string, file: Buffer) {
    try {
      const image = (await this.cloudinary.uploadImage(file)).url
      return this.prisma.movie.update({ 
        where: { id },
        data: { image }
      })
    } catch (error) {
      
    }
  }

  findAll() {
    return `This action returns all movies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
  
}
