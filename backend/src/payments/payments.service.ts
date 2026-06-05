import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentHistory } from './entities/payment-history.entity';
import { Member } from '../members/entities/member.entity';
import { PaymentLog } from './entities/payment-log.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(PaymentHistory)
    private paymentRepo: Repository<PaymentHistory>,

    @InjectRepository(Member)
    private memberRepo: Repository<Member>,

    @InjectRepository(PaymentLog)
    private logRepo: Repository<PaymentLog>,
  ) {}

  async create(dto: CreatePaymentDto, userId: number) {
    const payment = await this.paymentRepo.save({
      ...dto,
      status: 'PENDING',
      createdBy: userId,
    });

    await this.createLog(payment.id, 'PAYMENT_CREATED', userId);

    return this.paymentRepo.save({
      ...dto,
      status: 'PENDING',
      createdBy: userId,
    });
  }

  async confirmPayment(paymentId: number) {
    const payment = await this.paymentRepo.findOne({
      where: { id: paymentId },
    });

    if (!payment) {
      throw new Error('Payment not found');
    }

    if (payment.status !== 'PENDING') {
      throw new Error('Payment already processed');
    }

    payment.status = 'PAID';
    await this.createLog(payment.id, 'PAYMENT_CONFIRMED', 1);
    await this.paymentRepo.save(payment);

    const member = await this.memberRepo.findOne({
      where: { id: payment.memberId },
      relations: { membershipPackage: true },
    });
    await this.createLog(payment.id, 'MEMBERSHIP_EXTENDED', 1);

    if (!member) {
      throw new Error('Member not found');
    }

    const durationMonths = member.membershipPackage.duration_month;
    const validityDays = durationMonths * 30;

    const today = new Date();

    if (member.endDate && member.endDate > today) {
      const currentEnd = new Date(member.endDate);
      currentEnd.setDate(currentEnd.getDate() + validityDays);

      member.endDate = currentEnd;
    } else {
      const newStart = new Date();
      const newEnd = new Date();
      newEnd.setDate(newEnd.getDate() + validityDays);

      member.startDate = newStart;
      member.endDate = newEnd;
    }

    await this.memberRepo.save(member);

    return {
      message: 'Payment confirmed & membership updated',
      payment,
      member,
    };
  }

  async createLog(paymentId: number, action: string, actorId: number) {
    return this.logRepo.save({
      paymentId,
      action,
      actorId,
    });
  }

  async getLogs(paymentId: number) {
    return this.logRepo.find({
      where: { paymentId },
      order: { createdAt: 'ASC' },
    });
  }

  async getIncomeSummary(month?: number, year?: number) {
    const payments = await this.paymentRepo.find({
      where: {
        status: 'PAID',
      },
    });

    let filtered = payments;

    if (month && year) {
      filtered = payments.filter((p) => {
        const date = new Date(p.createdAt);
        return date.getMonth() + 1 === month && date.getFullYear() === year;
      });
    }

    const totalIncome = filtered.reduce((sum, p) => sum + Number(p.amount), 0);

    return {
      totalIncome,
      totalTransactions: filtered.length,
    };
  }
}
