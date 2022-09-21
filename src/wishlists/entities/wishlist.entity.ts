import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { IsUrl, Length } from 'class-validator';

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

  @ManyToOne(() => User, (user) => user.id)
  owner: User;
}
