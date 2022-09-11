import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import bcrypt from 'bcryptjs';
import { JwtGuard } from 'src/guards/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
  findUser(@Req() req: any) {
    return this.usersService.find({ username: req.user.username });
  }

  @UseGuards(JwtGuard)
  @Post('find')
  findMany(@Body() body: { username: string; email: string }) {
    if (body.username) {
      return this.usersService.find({ username: body.username });
    }
    if (body.email) {
      return this.usersService.find({ email: body.email });
    }
  }

  @UseGuards(JwtGuard)
  @Get(':username')
  findCurrentUser(@Param('username') username: string) {
    return this.usersService.find({ username: username });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch('me')
  update(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    const { password, ...res } = updateUserDto;
    return bcrypt
      .hash(password, 10)
      .then((hash: string) =>
        this.usersService.update(req.user.id, { password: hash, ...res }),
      );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
