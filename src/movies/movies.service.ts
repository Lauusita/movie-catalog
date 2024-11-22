import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Genre, Movie, Prisma } from '@prisma/client';

@Injectable()
export class MoviesService {
  private apiKey = process.env.MOVIE_API_KEY;

  constructor(private readonly prisma: PrismaService, private readonly cloudinary: CloudinaryService){}
  async create(createMovieDto: CreateMovieDto, file: Buffer) {
    try {
      const image = (await this.cloudinary.uploadImage(file)).url; 

      await this.prisma.movie.create({ data: { 
        ...createMovieDto,
        backgroundImage: "https://i.pinimg.com/736x/5a/d4/7a/5ad47aae12355d55c86bcb408d88ba08.jpg",
        image,
      }})
      
      return { msg: "Movie created successfully" }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        console.error(error.message);
        throw new BadRequestException(`The body of the request is invalid. Please check your input fields.`);
      }
      throw new InternalServerErrorException('An unexpected error occurred while creating the movie.');
    }
  }

  async createByAPI(createMovieDto: CreateMovieDto) {
    try {
      console.log(createMovieDto);
      
      const petition = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${this.apiKey}`)
      
      const data = await petition.json()
      const dataObj = data.results as []
      
      const ids =  dataObj.map((e: any): number =>  e.id);
      
      ids.forEach(async(id) => {
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}`
        
        const petition = await fetch(url);
        const movieData = await petition.json()
        
        const qualification = this.calculateQualification(movieData.vote_average)
        
        const { genres } = movieData as { 
          genres: { name: string }[] 
        };
        
        const genre = genres
          .map(genre => genre.name
            .replace(/ /g, '_')
            .toUpperCase()
          ) as Genre[];
        
        await this.prisma.movie.create({ data: { 
          ...createMovieDto,
          title: movieData.title,
          description: movieData.overview,
          qualification,
          genre: genre,
          releaseDate: movieData.release_date,
          duration: `${movieData.runtime} min`,
          backgroundImage: `https://image.tmdb.org/t/p/w600_and_h900_bestv2${movieData.backdrop_path}`,
          image: `https://image.tmdb.org/t/p/w600_and_h900_bestv2${movieData.poster_path}`
        }})
      })

      return { msg: "Movie created successfully" }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        console.error(error.message);
        throw new BadRequestException("The body of the request is invalid. Please check your input fields.")
      }
      throw new InternalServerErrorException('An unexpected error occurred while creating the movie.', error.message);
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
      if (error instanceof Prisma.PrismaClientValidationError) {
        console.error(error.message);
        throw new BadRequestException(`The body of the request is invalid. Please check your input fields.`);
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

  private calculateQualification(x: number) {
    const num = (x * 5) / 10
    return parseFloat(num.toFixed(1))
  }
}
