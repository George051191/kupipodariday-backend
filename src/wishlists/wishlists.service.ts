import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishelistsRepository: Repository<Wishlist>,
  ) {}
  create(createWishlistsDto: CreateWishlistDto) {
    return this.wishelistsRepository.save(createWishlistsDto);
  }

  findAll() {
    return this.wishelistsRepository.find();
  }

  findOne(id: number) {
    return this.wishelistsRepository.findOneBy({ id });
  }

  async update(id: number, updateWishlistDto: UpdateWishlistDto) {
    await this.wishelistsRepository.update(id, updateWishlistDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.wishelistsRepository.delete(id);
  }
}
