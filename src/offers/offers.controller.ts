import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  UseGuards,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { JwtGuard } from 'src/guards/jwt.guard';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createOfferDto: CreateOfferDto, @Req() req: any) {
    return this.offersService.create(createOfferDto, req.user);
  }
  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.offersService.findAll();
  }
  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (isNaN(+id)) {
      return new BadRequestException();
    }
    const offer = await this.offersService.findOne(+id);
    if (!offer) {
      throw new NotFoundException();
    }
    return offer;
  }
}
