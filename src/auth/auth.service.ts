import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
dotenv.config();
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private configService: ConfigService,
  ) {}

  auth(user: User) {
    const payload = { sub: user.id };
    const options = `${process.env.JWT_SECRET}`;
    return { access_token: this.jwtService.sign(payload, { secret: options }) };
  }

  async validatePassword(username: string, password: string) {
    const user = await this.usersService.find(
      { username: username },
      { password: true },
    );

    if (!user) {
      throw new NotFoundException();
    }
    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return null;
      }
      return user;
    });
  }
}
