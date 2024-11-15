import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileExtensionValidationPipe implements PipeTransform {
  private readonly allowedExtensions = /\.(jpg|jpeg|png)$/; // Extensiones permitidas

  transform(value: any) {
    const { originalname } = value; // Extraer el nombre del archivo
    
    if (!originalname) return value
    
    if (!this.allowedExtensions.test(originalname.toLowerCase())) {
      throw new BadRequestException(
        `Invalid file type. Allowed extensions are: JPG, JPEG, PNG`,
      );
    }
    return value; // Retorna el archivo si pasa la validación
  }
}
