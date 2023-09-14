import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsDateString()
  birthDate: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 6,
    minNumbers: 0,
    minSymbols: 0,
    minUppercase: 0,
    minLowercase: 0,
  })
  password: string;
}
