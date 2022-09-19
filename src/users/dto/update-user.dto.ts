import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import {
  IsEmail,
  IsNotEmpty,
  Min,
  Max,
  IsUrl,
  Length,
  IsOptional,
} from 'class-validator';

export class UpdateUserDto {
  @Length(2, 64)
  @IsOptional()
  username: string;

  @Length(0, 200)
  @IsOptional()
  about: string;
  @IsOptional()
  avatar: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsOptional()
  password: string;
}
