import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Wish } from './entities/wish.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishesRepository: Repository<Wish>,
  ) {}
  create(createWishDto: CreateWishDto, owner: User) {
    return this.wishesRepository.save({
      ...createWishDto,
      owner: owner,
      copied: 0,
      raised: 0,
    });
  }

  findAll(options?: any) {
    return this.wishesRepository.find({
      where: {
        id: In(options),
      },
    });
  }

  findLast() {
    return this.wishesRepository.find({
      relations: {
        owner: {
          offers: true,
          wishes: true,
          wishlists: true,
        },
      },
      order: {
        createdAt: 'DESC',
      },
      take: 40,
    });
  }

  findTops() {
    return this.wishesRepository.find({
      order: {
        copied: 'DESC',
      },
      relations: {
        owner: {
          offers: true,
          wishes: true,
          wishlists: true,
        },
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
        offers: {
          user: {
            wishes: true,
            wishlists: true,
            offers: true,
          },
        },
        owner: true,
      },
    });
  }

  async update(
    id: number,
    updateWishDto?: UpdateWishDto,
    owner?: User,
    copied?: number,
    raised?: number,
  ): Promise<Wish> {
    await this.wishesRepository.update(id, {
      ...updateWishDto,
      owner: owner,
      copied: copied,
      raised: raised,
    });
    return this.findOne(id);
  }

  async updateRised(id: number, updateWishDto: UpdateWishDto, raised: number) {
    await this.wishesRepository.update(id, {
      ...updateWishDto,
      raised: raised,
    });
    return this.findOne(id);
  }

  async updateWithChecks(id: number, updateWishDto: UpdateWishDto, req: any) {
    const wish = await this.findOne(+id);
    if (wish.owner.id !== req.user.id) {
      throw new ForbiddenException();
    }
    if (wish.offers.length > 0) {
      const price = wish.price;
      return this.update(+id, { ...updateWishDto, price: price });
    }
    return this.update(+id, updateWishDto);
  }

  async remove(id: number) {
    await this.wishesRepository.delete(id);
  }

  async removeWithChecks(id: number, req: any) {
    const wish = await this.findOne(+id);
    if (wish.owner.id !== req.user.id) {
      throw new ForbiddenException();
    }

    await this.remove(id);
    return wish;
  }
}
