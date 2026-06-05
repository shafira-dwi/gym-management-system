import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { PaymentHistory } from './entities/payment-history.entity';
import { PaymentLog } from './entities/payment-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentHistory])],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}

TypeOrmModule.forFeature([PaymentHistory, PaymentLog]);
