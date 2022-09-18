import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...res } = createUserDto;
    const hash = await bcrypt.hash(password, 10);
    return this.usersRepository.save({ password: hash, ...res });
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({
      select: {
        username: true,
        about: true,
        id: true,
        createdAt: true,
        updateAt: true,
        avatar: true,
        email: true,
      },
      relations: {
        wishes: true,
        offers: true,
      },
    });
  }

  /* findUserWishes(name: string) {
    return this.usersRepository.find({
      where: {
        username: name,
      },
      select: {
        wishes: {
          offers: true,
          wishlists: true,
        },
      },
    });
  } */

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  find(options: any, conditions?: any) {
    return this.usersRepository.findOne({
      where: options,
      select: conditions,
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.usersRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.usersRepository.delete(id);
  }
}
