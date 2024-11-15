import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { Movie } from "@prisma/client";

@Injectable()
export class TransformIncomingData implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): Movie {
    const { rentPrice, salePrice, qualification, mainActors } = value 
    let arrayMainActors: string[] = mainActors;
    
    const newRentPrice = parseFloat(rentPrice)
    const newQualification = parseFloat(qualification)
    const newSalePrice = parseFloat(salePrice)

    if ( typeof(mainActors) === "string" ) {
      arrayMainActors = [mainActors]
    }

    return { 
      ...value, 
      mainActors: arrayMainActors,
      rentPrice: newRentPrice, 
      qualification: newQualification, 
      salePrice: newSalePrice 
    }
  }
}