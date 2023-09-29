import { IsEmail } from 'class-validator';

export class AuthLoginDto {
  @IsEmail()
  email: string;

  password: string;
}
