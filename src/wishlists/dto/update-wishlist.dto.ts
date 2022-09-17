import { PartialType } from '@nestjs/swagger';
import { Wish } from 'src/wishes/entities/wish.entity';
import { CreateWishlistDto } from './create-wishlist.dto';

export class UpdateWishlistDto extends PartialType(CreateWishlistDto) {}
