import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import {
  IsInt,
  IsEmail,
  IsNotEmpty,
  Min,
  Max,
  IsUrl,
  Length,
} from 'class-validator';
import { isInt16Array } from 'util/types';
import { User } from 'src/users/entities/user.entity';
import { Offer } from 'src/offers/entities/offer.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @Length(1, 250)
  @Column()
  name: string;

  @IsUrl()
  @Column()
  link: string;

  @IsUrl()
  @Column()
  image: string;

  @IsInt()
  @Column()
  price: number;

  @IsInt()
  @Column({
    nullable: true,
  })
  raised: number;

  @ManyToOne(() => User, (user) => user.id)
  owner: User;

  @Min(1)
  @Max(1024)
  @Column()
  description: string;

  @OneToMany(() => Offer, (offers) => offers.item)
  offers: Offer[];

  @IsInt()
  @Column({
    nullable: true,
  })
  copied: number;

  @ManyToOne(() => Wishlist, (wishlist) => wishlist.items)
  wishlist: Wishlist;
}
