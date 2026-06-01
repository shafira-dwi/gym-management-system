import { IsString, IsOptional, IsDateString, IsNumber } from 'class-validator';

export class CreateMemberDto {
  @IsString()
  fullName: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  email?: string;

  @IsOptional()
  address?: string;

  @IsDateString()
  joinDate: string;

  @IsDateString()
  expiredDate: string;

  @IsOptional()
  @IsNumber()
  membershipPackageId?: number;
}
