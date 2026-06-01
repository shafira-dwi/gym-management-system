import { Controller, Get, Param } from '@nestjs/common';
import { MembershipPackagesService } from './membership-packages.service';

@Controller('membership-packages')
export class MembershipPackagesController {
  constructor(private readonly service: MembershipPackagesService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }
}
