import { Inject, Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  constructor(@Inject('CLOUDINARY') private cloud: typeof cloudinary){}

  async uploadImage(buffer: Buffer): Promise<UploadApiResponse>  {
    return new Promise((resolve, reject) => {
      const uploadStream = this.cloud.uploader.upload_stream(
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        }
      );

      Readable.from(buffer).pipe(uploadStream);
    });
  }
}
