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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePutUserDto } from './dto/update-put-user.dto';

@Controller('users')
export class UserController {
  @Post()
  async create(@Body() { email, name, password }: CreateUserDto) {
    return { email, name, password };
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
  async update(
    @Body() { email, name, password }: UpdatePutUserDto,
    @Param() param,
  ) {
    return { email, name, password, param };
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
