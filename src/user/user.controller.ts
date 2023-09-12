import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Put,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDTO';

@Controller('users')
export class UserController {
  @Post()
  async create(@Body() body: CreateUserDto) {
    return { body };
  }
  @Get()
  async read() {
    return 'All Users';
  }

  @Get(':id')
  async show(@Param() params) {
    return { params };
  }

  @Put(':id')
  async update(@Body() body, @Param() param) {
    return { body, param };
  }

  @Patch(':id')
  async updatePartial(@Body() body, @Param() param) {
    return { body, param };
  }

  @Delete(':id')
  async delete(@Param() param) {
    return { param };
  }
}
