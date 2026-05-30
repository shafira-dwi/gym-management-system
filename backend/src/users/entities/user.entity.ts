import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Role } from 'src/common/enums/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.MARKETING,
  })
  role: Role;
}