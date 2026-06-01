import { Controller, Post, Patch, Body } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Get, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  create(@Body() dto: CreateMemberDto) {
    return this.membersService.create(dto);
  }

  @Post(':id/photo')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads/member-photos',
        filename: (req, file, callback) => {
          const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);

          const ext = extname(file.originalname);

          callback(null, `member-${req.params.id}-${uniqueName}${ext}`);
        },
      }),
    }),
  )
  uploadPhoto(@Param('id') id: string, @UploadedFile() file: any) {
    return {
      memberId: id,
      filename: file.filename,
    };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMemberDto) {
    return this.membersService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.membersService.remove(Number(id));
  }

  @Get()
  findAll() {
    return this.membersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.membersService.findOne(Number(id));
  }
}
