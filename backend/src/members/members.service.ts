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

  async getMyClosing(marketingId: number) {
    return this.memberRepository.find({
      where: {
        marketing: {
          id: marketingId,
        },
      },
      relations: {
        marketing: true,
      },
    });
  }

  async getRenewalReminder(marketingId?: number) {
    const today = new Date();
    const next7Days = new Date();
    next7Days.setDate(today.getDate() + 7);

    const query = this.memberRepository
      .createQueryBuilder('member')
      .leftJoinAndSelect('member.marketing', 'marketing')
      .where('member.expiredDate BETWEEN :today AND :next7Days', {
        today,
        next7Days,
      });

    if (marketingId) {
      query.andWhere('member.marketingId = :marketingId', { marketingId });
    }

    return query.getMany();
  }

  async getMarketingStats(marketingId?: number) {
    const today = new Date();

    const query = this.memberRepository.createQueryBuilder('member');

    // optional filter (marketing scope)
    if (marketingId) {
      query.where('member.marketingId = :marketingId', { marketingId });
    }

    // total closing
    const totalClosing = await query.getCount();

    // active member
    const activeMemberQuery = this.memberRepository
      .createQueryBuilder('member')
      .where('member.expiredDate >= :today', { today });

    if (marketingId) {
      activeMemberQuery.andWhere('member.marketingId = :marketingId', {
        marketingId,
      });
    }

    const activeMember = await activeMemberQuery.getCount();

    // expired member
    const expiredMemberQuery = this.memberRepository
      .createQueryBuilder('member')
      .where('member.expiredDate < :today', { today });

    if (marketingId) {
      expiredMemberQuery.andWhere('member.marketingId = :marketingId', {
        marketingId,
      });
    }

    const expiredMember = await expiredMemberQuery.getCount();

    return {
      totalClosing,
      activeMember,
      expiredMember,
    };
  }
}
