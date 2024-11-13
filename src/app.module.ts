import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [AuthModule, MoviesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {
}
