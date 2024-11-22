import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { Movie } from "@prisma/client";

@Injectable()
export class TransformIncomingData implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): Movie {
    const { rentPrice, salePrice, qualification, mainActors, genre, duration } = value 
    let arrayMainActors: string[] = mainActors;
    let arrayGenre: string[] = genre;
    
    const newRentPrice = parseFloat(rentPrice)
    const newQualification = parseFloat(qualification)
    const newSalePrice = parseFloat(salePrice)

    if ( typeof(mainActors) === "string" ) {
      arrayMainActors = [mainActors]
    }

    if ( typeof(genre) === "string" ) {
      arrayGenre = [genre]
    }

    return { 
      ...value, 
      duration: `${duration} min`,
      genre: arrayGenre,
      mainActors: arrayMainActors,
      rentPrice: newRentPrice, 
      qualification: newQualification, 
      salePrice: newSalePrice 
    }
  }
}