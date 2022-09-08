import { IsNotEmpty, Min, Max, IsUrl, max } from 'class-validator';
export class CreateWishlistDto {
  @Min(1)
  @Max(250)
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  image: string;
}
