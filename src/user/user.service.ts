import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePutUserDto } from './dto/update-put-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    return this.prisma.user.create({ data });
  }
  async list() {
    return this.prisma.user.findMany();
  }
  async show(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    { email, name, password, birthDate }: UpdatePutUserDto,
  ) {
    return this.prisma.user.update({
      data: {
        email,
        name,
        password,
        birthDate: birthDate ? new Date(birthDate) : null,
      },
      where: { id },
    });
  }
  async updatePartial(
    id: number,
    { email, name, password, birthDate }: UpdatePatchUserDto,
  ) {
    const data: any = {};

    if (birthDate) {
      data.birthDate = new Date(birthDate);
    }

    if (email) {
      data.email = email;
    }
    if (name) {
      data.name = name;
    }
    if (password) {
      data.password = password;
    }

    return this.prisma.user.update({
      data,
      where: { id },
    });
  }
}
