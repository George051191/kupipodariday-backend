import { IsNotEmpty, Min, Max, IsUrl } from 'class-validator';
export class CreateWishDto {
  @IsNotEmpty()
  @Min(1)
  @Max(250)
  name: string;
  @IsNotEmpty()
  @IsUrl()
  link: string;
  @IsNotEmpty()
  @IsUrl()
  image: string;
  @Min(1)
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  description: string;
}
