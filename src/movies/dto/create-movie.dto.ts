import { IsString, IsEnum, IsOptional, IsArray, IsNotEmpty } from 'class-validator';
import { Movie } from '../movie.interface';
import { Genre } from '@prisma/client';

export class CreateMovieDto implements Partial<Movie>{
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  genre: Genre[]; 

  @IsString()
  director: string;

  @IsString({ each: true })
  mainActors: string[] & string

  @IsString()
  duration: string;

  @IsString()
  rentPrice: string & number;

  @IsString()
  salePrice: string & number;;

  @IsString()
  qualification: string & number;; 

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  @IsOptional()
  releaseDate: string;

  @IsString()
  @IsOptional()
  backgroundImage: string;
}
