import {
  Controller,
  Post,
  UseGuards,
  Req,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LocalGuard } from '../guards/local.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);
      return this.authService.auth(user);
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  @UseGuards(LocalGuard)
  @Post('signin')
  signin(@Req() req) {
    return this.authService.auth(req.user);
  }
}
