import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { WishesService } from 'src/wishes/wishes.service';
import { DeepPartial, Repository } from 'typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Offer } from './entities/offer.entity';

@Injectable()
export class OffersService {
  constructor(
    private readonly userservice: UsersService,
    private readonly wishesService: WishesService,
    @InjectRepository(Offer)
    public offersRepository: Repository<Offer>,
  ) {}

  async create(createOfferDto: CreateOfferDto, user: User) {
    const { item } = createOfferDto;
    const wish = await this.wishesService.findOne(item);
    if (wish.owner.id === user.id) {
      return;
    }
    return this.offersRepository.save({
      ...createOfferDto,
      user: user,
      item: wish,
    });
  }

  findAll() {
    return this.offersRepository.find({
      relations: {
        item: {
          owner: {
            wishes: true,
            wishlists: true,
          },
        },
        user: {
          offers: true,
          wishes: true,
          wishlists: true,
        },
      },
    });
  }

  findOne(id: number) {
    return this.offersRepository.findOneBy({ id });
  }

  /*  async update(id: number, updateOfferDto: UpdateOfferDto) {
    await this.offersRepository.update(id, updateOfferDto);
    return this.findOne(id);
  } */

  async remove(id: number) {
    await this.offersRepository.delete(id);
  }
}
