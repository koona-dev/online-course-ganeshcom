import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsPhoneNumber,
  IsEnum,
  MinLength,
} from 'class-validator';
import UserRole from '../constants/user-role';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  @MinLength(8)
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('ID')
  readonly phone: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(UserRole)
  readonly role: string;
}
