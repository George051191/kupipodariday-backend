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

  findOne(id: number) {
    return this.wishesRepository.findOneBy({ id });
  }

  async update(id: number, updateWishDto: UpdateWishDto): Promise<Wish> {
    await this.wishesRepository.update(id, updateWishDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.wishesRepository.delete(id);
  }
}
