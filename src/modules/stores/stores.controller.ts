import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OkResponseRepresentation } from 'src/common/representations/ok-result.response';
import { UuidDto } from 'src/common/dto/uuid.dto';
import { StoreRepresentation } from './representation/store.representation';
import { StoreProductDto } from './dto/store-product.dto';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Controller('stores')
@ApiTags('Stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post()
  @ApiOperation({ summary: 'Create store' })
  @ApiOkResponse({ type: OkResponseRepresentation })
  async create(@Body() dto: CreateStoreDto) {
    await this.storesService.create(dto);

    return new OkResponseRepresentation();
  }

  @Post(':storeId/products/:productId/price')
  @ApiOperation({ summary: 'Set product price' })
  @ApiOkResponse({ type: OkResponseRepresentation })
  async setPrice(
    @Param() { storeId, productId }: StoreProductDto,
    @Body() dto: CreatePriceDto,
  ) {
    await this.storesService.setPrice(storeId, productId, dto);

    return new OkResponseRepresentation();
  }

  @Post(':storeId/products/:productId/stock')
  @ApiOperation({ summary: 'Update product stock' })
  @ApiOkResponse({ type: OkResponseRepresentation })
  async updateStock(
    @Param() { storeId, productId }: StoreProductDto,
    @Body() dto: UpdateStockDto,
  ) {
    await this.storesService.updateStock(storeId, productId, dto);

    return new OkResponseRepresentation();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get store by id' })
  @ApiOkResponse({ type: StoreRepresentation })
  async findOne(@Param('id') id: string) {
    return await this.storesService.getById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update store' })
  @ApiOkResponse({ type: OkResponseRepresentation })
  async update(@Param() { id }: UuidDto, @Body() dto: UpdateStoreDto) {
    await this.storesService.update(id, dto);

    return new OkResponseRepresentation();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Update store' })
  @ApiOkResponse({ type: OkResponseRepresentation })
  async remove(@Param() { id }: UuidDto) {
    await this.storesService.remove(id);

    return new OkResponseRepresentation();
  }
}
