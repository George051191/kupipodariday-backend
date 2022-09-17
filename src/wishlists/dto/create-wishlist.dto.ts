import { IsNotEmpty, Min, Max, IsUrl, Length } from 'class-validator';
import { Wish } from 'src/wishes/entities/wish.entity';
export class CreateWishlistDto {
  @Length(1, 200)
  @IsNotEmpty()
  name: string;

  @Length(0, 1500)
  description: string;

  @IsNotEmpty()
  @IsUrl()
  image: string;

  @IsNotEmpty()
  items: number[];
}
