import { Strategy } from 'passport-local';
import { ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UsersService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(process.env.JWT_SECRET),
    });
  }

  async validate(jwtPayload: { sub: number }) {
    const user = this.usersService.findOne(jwtPayload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
