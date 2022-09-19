import {
  IsNotEmpty,
  Min,
  Max,
  IsUrl,
  Length,
  IsOptional,
} from 'class-validator';
export class CreateWishDto {
  @IsNotEmpty()
  @Length(1, 250)
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

  description: string;

  raised?: number;
}
