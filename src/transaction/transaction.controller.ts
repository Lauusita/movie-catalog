import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionDto } from './dto/transaction.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('transaction')
@UseGuards(AuthGuard)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async create(@Req() req: Request, @Body() transactionData: TransactionDto) {
    const { id } = req['user'] 
    return await this.transactionService.saveTransaction(transactionData, id);
  }

  @Get("/rent")
  async getRentedMovies(@Req() req: Request) {
    const { id } = req['user'] 
    return await this.transactionService.getRentedMovies(id);
  }

  @Get("/purchase")
  async getPurchasedMovies(@Req() req: Request) {
    const { id } = req['user'] 
    return await this.transactionService.getPurchasedMovies(id);
  }
}
