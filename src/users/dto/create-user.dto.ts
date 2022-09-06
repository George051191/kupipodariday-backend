import { IsEmail, IsNotEmpty, Min, Max, IsUrl } from 'class-validator';

export class CreateUserDto {
  @Min(1)
  @Max(64)
  @IsNotEmpty()
  username: string;

  @Min(0)
  @Max(200)
  about: string;

  @IsUrl()
  avatar: string;

  @IsEmail()
  email: string;

  @Min(2)
  @IsNotEmpty()
  password: string;
}
