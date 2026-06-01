import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MembershipPackage } from '../../membership-packages/entities/membership-package.entity';
import { User } from '../../users/entities/user.entity';

@Entity('members')
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  memberCode: string;

  @Column()
  fullName: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ nullable: true })
  photoUrl: string;

  @Column({ type: 'date' })
  joinDate: string;

  @Column({ type: 'date' })
  expiredDate: string;

  @Column({ nullable: true })
  membershipPackageId: number;

  @ManyToOne(() => MembershipPackage)
  @JoinColumn({ name: 'membershipPackageId' })
  membershipPackage: MembershipPackage;

  @Column({ nullable: true })
  marketingId: number;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'marketingId' })
  marketing: User;

  @Column({ nullable: true })
  personalTrainerId: number;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'personalTrainerId' })
  personalTrainer: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
