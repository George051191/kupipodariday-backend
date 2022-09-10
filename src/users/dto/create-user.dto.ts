import { IsEmail, IsNotEmpty, Min, Max, IsUrl, Length } from 'class-validator';

export class CreateUserDto {
  @Length(2, 64)
  @IsNotEmpty()
  username: string;

  @Length(0, 200)
  about: string;

  avatar: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
