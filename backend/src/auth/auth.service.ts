import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.usersService.create({
      fullname: dto.fullname,
      email: dto.email,
      password: hashedPassword,
    });

    return {
      message: 'User created successfully',
      user,
    };
  }
  async login(dto: any) {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user) {
      return { message: 'User not found' };
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);

    if (!isMatch) {
      return { message: 'Wrong password' };
    }

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      message: 'Login success',
      access_token: token,
    };
  }
}
