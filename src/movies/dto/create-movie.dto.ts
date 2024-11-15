import { IsString, IsUUID, IsOptional, IsArray, IsNumber, IsDecimal, IsEnum } from 'class-validator';

enum Genre {
  ACCION = 'ACCION',
  COMEDIA = 'COMEDIA',
  ROMANCE = 'ROMANCE',
  TERROR = 'TERROR',
  DRAMA = 'DRAMA',
  HORROR = 'HORROR',
  SUSPENSO = 'SUSPENSO',
  INFANTIL = 'INFANTIL',
  TODO = 'TODO',
}

export class CreateMovieDto {
  @IsString()
  title: string;

  @IsString()
  desc: string;

  @IsEnum(Genre)
  genre: Genre; 

  @IsString()
  director: string;

  @IsArray()
  @IsString({ each: true })
  mainActors: string[];

  @IsString()
  duration: string;

  @IsNumber()
  rentPrice: number;

  @IsNumber()
  salePrice: number;

  @IsString()
  image: string;

  @IsDecimal()
  qualification: number; 
}
