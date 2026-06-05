import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('payment_logs')
export class PaymentLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  paymentId: number;

  @Column()
  action: string;

  @Column()
  actorId: number;

  @CreateDateColumn()
  createdAt: Date;
}
