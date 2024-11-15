import { Decimal } from '@prisma/client/runtime/library';
import { IsString, IsArray, IsNumber, IsDecimal, IsEnum, IsOptional } from 'class-validator';
import { Movie } from '../movie.interface';
import { Genre } from '@prisma/client';

export class CreateMovieDto implements Partial<Movie>{
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(Genre)
  genre: Genre; 

  @IsString()
  director: string;

  @IsString()
  mainActors: string[] | string

  @IsString()
  duration: string;

  @IsString()
  rentPrice: string;

  @IsString()
  salePrice: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  qualification: string; 
}
