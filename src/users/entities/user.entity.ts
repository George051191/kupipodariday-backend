import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { IsEmail, IsNotEmpty, Min, Max, IsUrl, Length } from 'class-validator';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Offer } from 'src/offers/entities/offer.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @IsNotEmpty()
  @Length(2, 30)
  @Column({
    unique: true,
  })
  username: string;

  @Length(2, 200)
  @Column({
    default: 'Пока ничего не рассказал о себе',
  })
  about: string;

  @Column({
    default: 'https://i.pravatar.cc/300',
  })
  avatar: string;

  @IsEmail()
  @Column({
    unique: true,
  })
  email: string;

  @IsNotEmpty()
  @Column()
  password: string;

  @OneToMany(() => Wish, (wishes) => wishes.owner)
  wishes: Wish[];

  @OneToMany(() => Offer, (offers) => offers.user)
  offers: Offer[];

  @OneToMany(() => Wishlist, (wishlists) => wishlists.owner)
  wishlists: Wishlist[];
}
