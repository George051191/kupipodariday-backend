import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Offer } from './entities/offer.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    public offersRepository: Repository<Offer>,
  ) {}

  create(createOfferDto: CreateOfferDto) {
    return this.offersRepository.save(createOfferDto);
  }

  findAll() {
    return this.offersRepository.find();
  }

  findOne(id: number) {
    return this.offersRepository.findOneBy({ id });
  }

  async update(id: number, updateOfferDto: UpdateOfferDto) {
    await this.offersRepository.update(id, updateOfferDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.offersRepository.delete(id);
  }
}
