import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { WarehousesService } from './warehouses.service';
import { UpdateStockDto } from '../stores/dto/update-stock.dto';
import { OkResponseRepresentation } from 'src/common/representations/ok-result.response';

@Controller('warehouses')
@ApiTags('Warehouses')
export class WarehousesController {
  constructor(private readonly service: WarehousesService) {}

  @Post('products/:productId/stock')
  @ApiOperation({ summary: 'Update warehouse product stock' })
  @ApiOkResponse({ type: OkResponseRepresentation })
  async updateWarehouseStock(
    @Param('productId') productId: string,
    @Body() updateStockDto: UpdateStockDto,
  ) {
    await this.service.updateWarehouseStock(productId, updateStockDto);

    return new OkResponseRepresentation();
  }
}
