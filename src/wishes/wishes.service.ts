import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wish } from './entities/wish.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishesRepository: Repository<Wish>,
  ) {}
  create(createWishDto: CreateWishDto) {
    return this.wishesRepository.save(createWishDto);
  }

  findAll() {
    return this.wishesRepository.find();
  }

  findLast() {
    return this.wishesRepository.find({
      select: {
        name: true,
        price: true,
        raised: true,
        link: true,
        copied: true,
      },
      order: {
        createdAt: 'ASC',
      },
      take: 40,
    });
  }

  findTops() {
    return this.wishesRepository.find({
      select: {
        name: true,
        price: true,
        raised: true,
        link: true,
        copied: true,
      },
      order: {
        copied: 'ASC',
      },
      take: 20,
    });
  }

  findOne(id: number) {
    return this.wishesRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        offers: true,
        owner: true,
      },
    });
  }

  async update(id: number, updateWishDto: UpdateWishDto): Promise<Wish> {
    await this.wishesRepository.update(id, updateWishDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.wishesRepository.delete(id);
  }
}
