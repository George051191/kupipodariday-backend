import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailSender } from 'src/emailsender/emailsender.service';
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
    private readonly emailservice: EmailSender,
    @InjectRepository(Offer)
    public offersRepository: Repository<Offer>,
  ) {}

  async create(createOfferDto: CreateOfferDto, user: User) {
    const { itemId, amount } = createOfferDto;
    const wish = await this.wishesService.findOne(+itemId);
    if (!wish) {
      throw new NotFoundException();
    }
    const { name, description, image, price, raised } = wish;
    if (wish.owner.id === user.id) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'Запрещено отправлять деньги на собственные подарки',
        },
        HttpStatus.CONFLICT,
      );
    }
    if (wish.price < amount + wish.raised) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: `Внесите не больше этой суммы: ${wish.price - wish.raised} `,
        },
        HttpStatus.CONFLICT,
      );
    }

    const updatedWish = await this.wishesService.updateRised(
      itemId,
      {
        name,
        description,
        image,
        price,
      },
      raised + amount,
    );
    if (updatedWish.raised === updatedWish.price) {
      const usersMails = updatedWish.offers.map((item) => {
        return item.user.email;
      });
      await this.emailservice.sendEmail(
        usersMails,
        updatedWish.link,
        updatedWish.image,
      );
      return;
    }
    return this.offersRepository.save({
      ...createOfferDto,
      user: user,
      item: updatedWish,
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

  async remove(id: number) {
    await this.offersRepository.delete(id);
  }
}
