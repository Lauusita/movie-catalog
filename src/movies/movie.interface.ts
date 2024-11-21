import { Genre } from "@prisma/client";

export type Movie = {
  rentPrice: string;
  salePrice: string;
  qualification: string;
  id: string;
  title: string;
  description: string;
  genre: Genre[];
  director: string;
  mainActors: string[] | string;
  duration: string;
  image: string;
}