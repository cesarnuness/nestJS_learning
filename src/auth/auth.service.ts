import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { UserService } from '../user/user.service';

const test = UserService;
function testing() {
  return test;
}

testing();
@Injectable()
export class AuthService {
  private issuer = 'login';
  private audience = 'users';

  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly UserService: UserService,
  ) {}

  async createToken(user: User) {
    return {
      acessToken: this.jwtService.sign(
        {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        {
          expiresIn: '7d',
          subject: user.id.toString(),
          issuer: this.issuer,
          audience: this.audience,
        },
      ),
    };
  }

  async checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        audience: this.audience,
        issuer: this.issuer,
      });
      return data;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async isValidToken(token) {
    try {
      this.checkToken(token);
      return true;
    } catch (e) {
      return false;
    }
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: { email, password },
    });

    if (!user) {
      throw new UnauthorizedException('Email ou senha incorretos!');
    }
    return this.createToken(user);
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
    const user = await this.prisma.user.update({
      where: { id },
      data: { password },
    });
    return this.createToken(user);
  }
  async register(data: AuthRegisterDto) {
    const user = await this.UserService.create(data);
    return this.createToken(user);
  }
}
