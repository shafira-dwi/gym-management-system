import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembershipPackage } from './entities/membership-package.entity';
import { MembershipPackagesService } from './membership-packages.service';
import { MembershipPackagesController } from './membership-packages.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MembershipPackage])],
  controllers: [MembershipPackagesController],
  providers: [MembershipPackagesService],
  exports: [TypeOrmModule], // penting biar bisa dipakai di members module
})
export class MembershipPackagesModule {}
