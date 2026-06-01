import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MembershipPackage } from './entities/membership-package.entity';

@Injectable()
export class MembershipPackagesService {
  constructor(
    @InjectRepository(MembershipPackage)
    private repo: Repository<MembershipPackage>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }
}
