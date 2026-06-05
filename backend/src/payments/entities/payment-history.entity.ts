import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Member } from '../../members/entities/member.entity';

@Entity('payment_history')
export class PaymentHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  memberId: number;

  @Column('int')
  amount: number;

  @Column({ type: 'enum', enum: ['NEW', 'EXTEND'] })
  type: string;

  @Column({ type: 'enum', enum: ['CASH', 'TRANSFER', 'EWALLET'] })
  method: string;

  @Column({
    type: 'enum',
    enum: ['PENDING', 'PAID', 'FAILED'],
    default: 'PENDING',
  })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  createdBy: number;

  @ManyToOne(() => Member, (member) => member.payments)
  @JoinColumn({ name: 'memberId' })
  member: Member;
}
