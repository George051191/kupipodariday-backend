import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { IsInt, IsUrl, Length } from 'class-validator';

import { User } from 'src/users/entities/user.entity';
import { Offer } from 'src/offers/entities/offer.entity';

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

  @Length(1, 1240)
  @Column({
    nullable: true,
  })
  description: string;

  @OneToMany(() => Offer, (offers) => offers.item)
  offers: Offer[];

  @IsInt()
  @Column({
    nullable: false,
    default: 0,
  })
  copied: number;
}
