import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { OkResponseRepresentation } from 'src/common/representations/ok-result.response';
import { UuidDto } from 'src/common/dto/uuid.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SingleProductRepresentation } from './representations/single-product.representation';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create product with categories' })
  @ApiOkResponse({ type: OkResponseRepresentation })
  async create(@Body() createProductDto: CreateProductDto) {
    await this.productsService.create(createProductDto);

    return new OkResponseRepresentation();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by id' })
  @ApiOkResponse({ type: SingleProductRepresentation })
  async findOne(@Param() { id }: UuidDto) {
    return await this.productsService.getById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update product' })
  @ApiOkResponse({ type: OkResponseRepresentation })
  async update(@Param() { id }: UuidDto, @Body() dto: UpdateProductDto) {
    await this.productsService.update(id, dto);

    return new OkResponseRepresentation();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete product' })
  @ApiOkResponse({ type: OkResponseRepresentation })
  async remove(@Param() { id }: UuidDto) {
    await this.productsService.delete(id);

    return new OkResponseRepresentation();
  }
}
