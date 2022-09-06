import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { WishesModule } from './wishes/wishes.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { OffersModule } from './offers/offers.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    WishlistsModule,
    WishesModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'student',
      password: 'student',
      database: 'kupipodariday',
      entities: [User],
      synchronize: true,
    }),
    OffersModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

/* Пользователи (users)
Подарки (wishes)
Списки желаний (wishlists)
Предложения скинуться на подарок (offers). */
