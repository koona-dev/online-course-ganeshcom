import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsPhoneNumber,
  IsEnum,
  MinLength,
} from 'class-validator';

enum UserRole {
  student,
  instruktur,
}
export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  // @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  // @IsStrongPassword()
  // @MinLength(8)
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  // @IsPhoneNumber('ID')
  readonly phone: string;

  @IsNotEmpty()
  @IsString()
  // @IsEnum(UserRole)
  readonly role: string;
}
