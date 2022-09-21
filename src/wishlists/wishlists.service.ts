import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { WishesService } from 'src/wishes/wishes.service';
import { Repository } from 'typeorm';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';

@Injectable()
export class WishlistsService {
  constructor(
    private readonly wishesService: WishesService,
    @InjectRepository(Wishlist)
    private wishelistsRepository: Repository<Wishlist>,
  ) {}
  async create(createWishlistsDto: CreateWishlistDto, owner: User) {
    const wishList = await this.wishelistsRepository.save({
      ...createWishlistsDto,
      owner: owner,
    });
    return this.wishelistsRepository.find({
      where: {
        id: wishList.id,
      },
      relations: {
        owner: true,
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
    return this.wishelistsRepository.findOne({
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

  async find(id: number) {
    const wishlists = await this.wishelistsRepository.findOne({
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
    if (!wishlists) {
      return new NotFoundException();
    }
    return wishlists;
  }

  async update(
    id: number,
    updateWishlistDto: UpdateWishlistDto,
    userId: number,
  ) {
    const wishList = await this.findOne(id);
    if (!wishList) {
      return new NotFoundException();
    }
    if (userId !== wishList.owner.id) {
      return new ForbiddenException();
    }
    await this.wishelistsRepository.update(id, updateWishlistDto);
    return this.findOne(id);
  }

  async remove(id: number, userId: number) {
    const wishList = await this.findOne(id);
    if (!wishList) {
      return new NotFoundException();
    }
    if (userId !== wishList.owner.id) {
      throw new ForbiddenException();
    }
    await this.wishelistsRepository.delete(id);
  }
}
