import { $Enums, Transaction, TransactionType } from "@prisma/client";
import { IsDate, IsEnum, IsNumber, isString, IsString } from "class-validator";

export class TransactionDto implements Partial<Transaction>{
  @IsString()
  movieId: string;

  @IsNumber()
  price: number;

  @IsEnum(TransactionType)
  transactionType: TransactionType;
}