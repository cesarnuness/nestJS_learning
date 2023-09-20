import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async createToken() {
    // return this.jwtService.sign({});
  }
  async checkToken() {
    // return this.jwtService.verify({});
  }
  async login(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: { email, password },
    });

    if (!user) {
      throw new UnauthorizedException('Email ou senha incorretos!');
    }
    return user;
  }
  async forget(email: string) {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Email não encontrado!');
    }

    // @TODO enviar um e-mail
    return true;
  }
  async reset(password: string, token: string) {
    // @TODO Validar Token

    const id = 1; //PLaceholder - We get the ID from the Token in the previous
    console.log(token);
    await this.prisma.user.update({
      where: { id },
      data: { password },
    });
    return true;
  }
}
