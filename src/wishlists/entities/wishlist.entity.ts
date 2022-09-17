import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { IsEmail, IsNotEmpty, Min, Max, IsUrl, Length } from 'class-validator';
import { Wish } from 'src/wishes/entities/wish.entity';
import { User } from 'src/users/entities/user.entity';

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
  @Column()
  description: string;

  @IsUrl()
  @Column()
  image: string;

  @ManyToMany(() => Wish, (items) => items.id)
  @JoinTable()
  items: Wish[] | number[];

  @ManyToOne(() => User, (user) => user.id)
  owner: User;
}
