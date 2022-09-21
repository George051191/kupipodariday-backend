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
  BadRequestException,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { JwtGuard } from 'src/guards/jwt.guard';
import { UsersService } from 'src/users/users.service';
import { RequestWithUser } from 'src/utils/utilstypes';

@Controller('wishlists')
export class WishlistsController {
  constructor(
    private readonly wishlistsService: WishlistsService,
    private readonly usersService: UsersService,
  ) {}
  @UseGuards(JwtGuard)
  @Post()
  async create(
    @Body() createWishlistDto: CreateWishlistDto,
    @Req() req: RequestWithUser,
  ) {
    const owner = await this.usersService.findOne(req.user.id);
    return this.wishlistsService.create(createWishlistDto, owner);
  }
  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.wishlistsService.findAll();
  }
  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    if (isNaN(+id)) {
      return new BadRequestException();
    }
    return this.wishlistsService.find(+id);
  }
  @UseGuards(JwtGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWishlistDto: UpdateWishlistDto,
    @Req() req: RequestWithUser,
  ) {
    if (isNaN(+id)) {
      return new BadRequestException();
    }
    return this.wishlistsService.update(+id, updateWishlistDto, req.user.id);
  }
  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    if (isNaN(+id)) {
      return new BadRequestException();
    }
    return this.wishlistsService.remove(+id, req.user.id);
  }
}
