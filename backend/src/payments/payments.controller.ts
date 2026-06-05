import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  create(@Body() dto: CreatePaymentDto) {
    return this.paymentsService.create(dto, 1); // sementara userId dummy
  }

  @Get()
  findAll() {
    return 'payments list';
  }

  @Get(':id/logs')
  getLogs(@Param('id') id: number) {
    return this.paymentsService.getLogs(id);
  }

  @Get('income/summary')
  getIncomeSummary(
    @Query('month') month?: number,
    @Query('year') year?: number,
  ) {
    return this.paymentsService.getIncomeSummary(month, year);
  }
}
