import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { OkResponseRepresentation } from 'src/common/representations/ok-result.response';
import { UuidDto } from 'src/common/dto/uuid.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductRepresentation } from './representations/product.representation';
import { GetPaginatedProductsDto } from './dto/get-paginated-products.dto';
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response.decorator';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create product with categories' })
  @ApiOkResponse({ type: OkResponseRepresentation })
  async create(@Body() createProductDto: CreateProductDto) {
    await this.service.create(createProductDto);

    return new OkResponseRepresentation();
  }

  @Get()
  @ApiOperation({ summary: 'Get paginated products' })
  @ApiPaginatedResponse(ProductRepresentation)
  async getPaginated(@Query() dto: GetPaginatedProductsDto) {
    return await this.service.getPaginated(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by id' })
  @ApiOkResponse({ type: ProductRepresentation })
  async findOne(@Param() { id }: UuidDto) {
    return await this.service.getById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update product' })
  @ApiOkResponse({ type: OkResponseRepresentation })
  async update(@Param() { id }: UuidDto, @Body() dto: UpdateProductDto) {
    await this.service.update(id, dto);

    return new OkResponseRepresentation();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete product' })
  @ApiOkResponse({ type: OkResponseRepresentation })
  async remove(@Param() { id }: UuidDto) {
    await this.service.delete(id);

    return new OkResponseRepresentation();
  }
}
