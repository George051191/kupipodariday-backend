import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { IsOptional, IsUrl, Length } from 'class-validator';

import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @Length(1, 250)
  @Column()
  name: string;

  @Length(1, 1500)
  @Column({ nullable: true })
  description: string;

  @IsUrl()
  @Column()
  image: string;

  @ManyToOne(() => User, (user) => user.id)
  owner: User;

  @ManyToMany(() => Wish)
  @JoinTable()
  @IsOptional()
  public items: Wish[];
}
