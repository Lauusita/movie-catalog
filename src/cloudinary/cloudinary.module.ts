import { CloudinaryService } from './cloudinary.service';
import { CloudinaryController } from './cloudinary.controller';
import { Module, Global } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Module({
  controllers: [CloudinaryController],
  providers: [ CloudinaryService, {
    provide: "CLOUDINARY",
    useFactory() {
      cloudinary.config({
        api_key: process.env.API_KEY,
        cloud_name: process.env.CLOUD_NAME,
        api_secret: process.env.API_SECRET,
      });
      return cloudinary;
    },
  }],
  exports: ["CLOUDINARY"]
})
export class CloudinaryModule {}
