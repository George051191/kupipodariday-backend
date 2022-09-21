import { IsNotEmpty, IsUrl, Length } from 'class-validator';

export class CreateWishlistDto {
  @Length(1, 200)
  @IsNotEmpty()
  name: string;

  @Length(0, 1500)
  description: string;

  @IsNotEmpty()
  @IsUrl()
  image: string;
}
