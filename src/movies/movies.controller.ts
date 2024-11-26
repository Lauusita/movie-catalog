import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, UsePipes } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { TransformIncomingData } from './pipes/create-movie.pipe';
import { FileExtensionValidationPipe } from './pipes/validate-file-extension.pipe';

@Controller('movies')
@UseGuards(AuthGuard)
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    limits: { fileSize: 10 * 1024 * 1024 },
  }))
  async create(
    @Body(new TransformIncomingData()) createMovieDto: CreateMovieDto, 
    @UploadedFile(new FileExtensionValidationPipe()) file: Express.Multer.File
  ) {
    return await this.moviesService.create(createMovieDto, file.buffer);
  }

  @Post("/apart")
  async createByApi(
    @Body(new TransformIncomingData()) createMovieDto: CreateMovieDto
  ){
    return await this.moviesService.createByAPI(createMovieDto);
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }
}
