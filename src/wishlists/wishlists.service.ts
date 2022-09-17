import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { WishesService } from 'src/wishes/wishes.service';
import { Repository } from 'typeorm';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';
import { In } from 'typeorm';

@Injectable()
export class WishlistsService {
  constructor(
    private readonly wishesService: WishesService,
    @InjectRepository(Wishlist)
    private wishelistsRepository: Repository<Wishlist>,
  ) {}
  async create(createWishlistsDto: CreateWishlistDto, owner: User) {
    const { items } = createWishlistsDto;
    const wishes = await this.wishesService.findAll(items);

    const wishList = await this.wishelistsRepository.save({
      ...createWishlistsDto,
      items: wishes,
      owner: owner,
    });
    console.log(wishList);
    return this.wishelistsRepository.find({
      where: {
        id: wishList.id,
      },
      relations: {
        owner: true,
        items: true,
      },
    });
  }

  findAll() {
    return this.wishelistsRepository.find({
      relations: {
        owner: true,
      },
    });
  }

  findOne(id: number) {
    return this.wishelistsRepository.findOneBy({ id });
  }

  find(id: number) {
    return this.wishelistsRepository.find({
      where: {
        id: id,
      },
      relations: {
        owner: {
          offers: true,
          wishes: true,
          wishlists: true,
        },
      },
    });
  }

  async update(
    id: number,
    updateWishlistDto: UpdateWishlistDto,
    userId: number,
  ) {
    const wishList = await this.findOne(id);
    if (userId !== wishList.owner.id) {
      throw new ForbiddenException();
    }
    /*   const { items } = updateWishlistDto;
    let wishes: Wish[];
    for (const item of items) {
      const wish = await this.wishesService.findOne(item);
      wishes.push(wish);
    } */
    await this.wishelistsRepository.update(id, {
      ...updateWishlistDto,
    });
    return this.findOne(id);
  }

  async remove(id: number, userId: number) {
    const wishList = await this.findOne(id);
    if (userId !== wishList.owner.id) {
      throw new ForbiddenException();
    }
    await this.wishelistsRepository.delete(id);
  }
}
