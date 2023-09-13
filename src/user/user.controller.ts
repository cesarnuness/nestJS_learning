import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Put,
  Delete,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePutUserDto } from './dto/update-put-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }
  @Get()
  async read() {
    return 'All Users';
  }

  @Get(':id')
  async show(@Param('id', ParseIntPipe) id: number) {
    return { id };
  }

  @Put(':id')
  async update(
    @Body() { email, name, password }: UpdatePutUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return { email, name, password, id };
  }

  @Patch(':id')
  async updatePartial(
    @Body() { email, name, password }: UpdatePatchUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return { email, name, password, id };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return { id };
  }
}
