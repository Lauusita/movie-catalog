import { $Enums, paymentMethod, Transaction, TransactionType } from "@prisma/client";
import { IsDate, IsEnum, IsNumber, IsString } from "class-validator";

export class TransactionDto implements Partial<Transaction>{
  @IsString()
  movieId: string;

  @IsNumber()
  price: number;

  @IsEnum(TransactionType)
  transactionType: TransactionType;

  @IsString()
  email: string;

  @IsEnum(paymentMethod)
  paymentMethod: paymentMethod;
}