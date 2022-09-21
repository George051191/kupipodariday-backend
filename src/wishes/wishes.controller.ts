import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { JwtGuard } from 'src/guards/jwt.guard';
import { UsersService } from 'src/users/users.service';
import { RequestWithUser } from 'src/utils/utilstypes';

@Controller('wishes')
export class WishesController {
  constructor(
    private readonly wishesService: WishesService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(
    @Body() createWishDto: CreateWishDto,
    @Req() req: RequestWithUser,
  ) {
    const owner = await this.usersService.findOne(req.user.id);
    return this.wishesService.create(createWishDto, owner);
  }
  @UseGuards(JwtGuard)
  @Get('last')
  getlast() {
    return this.wishesService.findLast();
  }
  @UseGuards(JwtGuard)
  @Get('top')
  getTop() {
    return this.wishesService.findTops();
  }

  @UseGuards(JwtGuard)
  @Post(':id/copy')
  async copyWish(@Param('id') id: string, @Req() req: RequestWithUser) {
    if (isNaN(+id)) {
      return new BadRequestException();
    }
    const wish = await this.wishesService.findOne(+id);
    if (!wish) {
      throw new NotFoundException();
    }
    const {
      name,
      description,
      price,
      link,
      image,
      owner: currentOwner,
      copied,
    } = wish;
    const owner = await this.usersService.findOne(req.user.id);
    this.wishesService.update(
      +id,
      { name, description, price, link, image },
      currentOwner,
      copied + 1,
    );
    return this.wishesService.create(
      { name, description, price, link, image },
      owner,
    );
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWishDto: UpdateWishDto,
    @Req() req: RequestWithUser,
  ) {
    if (isNaN(+id)) {
      return new BadRequestException();
    }
    return this.wishesService.updateWithChecks(+id, updateWishDto, req);
  }
  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    const wish = await this.wishesService.removeWithChecks(+id, req);
    if (!wish) {
      throw new NotFoundException();
    }
    return wish;
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    if (isNaN(+id)) {
      return new BadRequestException();
    }
    return this.wishesService.findOne(+id);
  }
}
