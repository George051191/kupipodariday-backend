import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Req,
  UseGuards,
  NotFoundException,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtGuard } from 'src/guards/jwt.guard';
import { RequestWithUser } from 'src/utils/utilstypes';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const { password, ...res } = createUserDto;
    return bcrypt
      .hash(password, 10)
      .then((hash: string) =>
        this.usersService.create({ password: hash, ...res }),
      );
  }
  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get('me')
  findUser(@Req() req: RequestWithUser) {
    console.log(req.user);
    return this.usersService.find({ username: req.user.username });
  }

  @UseGuards(JwtGuard)
  @Post('find')
  async findMany(@Body() body: { username: string; email: string }) {
    if (body.username) {
      const user = await this.usersService.find({ username: body.username });
      if (!user) {
        return new NotFoundException();
      }
      return user;
    }
    if (body.email) {
      const user = await this.usersService.find({ email: body.email });
      if (!user) {
        return new NotFoundException();
      }
      return user;
    }
  }

  @UseGuards(JwtGuard)
  @Get('me/wishes')
  findCurrentUserWishes(@Req() req: any) {
    return this.usersService.findUserWishes(req.user.username);
  }

  @UseGuards(JwtGuard)
  @Get(':username/wishes')
  async findUserWishes(@Req() req: any, @Param('username') username: string) {
    const wishes = await this.usersService.findUserWishes(username);
    if (!wishes) {
      return new NotFoundException();
    }
    return wishes;
  }
  //// поиск по имени пользователя
  @UseGuards(JwtGuard)
  @Get(':username')
  async findCurrentUser(@Param('username') username: string) {
    const user = await this.usersService.find({ username: username });
    if (!user) {
      return new NotFoundException();
    }
    return user;
  }
  //// поиск по айдишнику
  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (isNaN(+id)) {
      return new BadRequestException();
    }
    const user = await this.usersService.findOne(+id);
    if (!user) {
      return new NotFoundException();
    }
    return user;
  }

  @UseGuards(JwtGuard)
  @Patch('me')
  update(@Req() req: RequestWithUser, @Body() updateUserDto: UpdateUserDto) {
    if (Object.keys(updateUserDto).length === 0) {
      return new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'Укажите какие данные нужно поменять',
        },
        HttpStatus.CONFLICT,
      );
    }
    const { password, ...res } = updateUserDto;
    if (password !== undefined) {
      return bcrypt
        .hash(password, 10)
        .then((hash: string) =>
          this.usersService.update(req.user.id, { password: hash, ...res }),
        );
    }
    return this.usersService.update(req.user.id, updateUserDto);
  }
}
