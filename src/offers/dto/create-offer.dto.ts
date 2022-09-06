import { IsEmail, IsNotEmpty, Min, Max, IsUrl } from 'class-validator';

export class CreateOfferDto {
  @Min(1)
  amount: number;

  @IsNotEmpty()
  hidden: boolean;

  @IsNotEmpty()
  itemId: number;
}
