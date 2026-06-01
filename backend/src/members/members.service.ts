import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './entities/member.entity';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  async create(dto: CreateMemberDto) {
    const lastMember = await this.memberRepository.find({
      order: { id: 'DESC' },
      take: 1,
    });

    let nextNumber = 1;

    if (lastMember.length > 0) {
      nextNumber = lastMember[0].id + 1;
    }

    const member = this.memberRepository.create({
      ...dto,
      memberCode: `MBR${String(nextNumber).padStart(4, '0')}`,
    });

    return await this.memberRepository.save(member);
  }

  async update(id: number, dto: UpdateMemberDto) {
    return await this.memberRepository.update(id, dto);
  }

  async remove(id: number) {
    return await this.memberRepository.delete(id);
  }

  async findAll() {
    return await this.memberRepository.find();
  }

  async findOne(id: number) {
    return await this.memberRepository.findOne({
      where: { id },
    });
  }
}
