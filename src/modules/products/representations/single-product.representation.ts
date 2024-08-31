import { ApiProperty } from '@nestjs/swagger';
import { PriceRepresentation } from './price.representation';
import { StoreLeftoversRepresentation } from './store-leftovers.representation';
import { WarehouseLeftoversRepresentation } from './warehouse-leftovers.representation';

export class SingleProductRepresentation {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: String })
  description: string | null;

  @ApiProperty({ isArray: true })
  categories: string[];

  @ApiProperty({ isArray: true, type: PriceRepresentation })
  prices: PriceRepresentation[];

  @ApiProperty({ isArray: true, type: StoreLeftoversRepresentation })
  storeLeftovers: StoreLeftoversRepresentation[];

  @ApiProperty({ isArray: true, type: WarehouseLeftoversRepresentation })
  warehouseLeftovers: WarehouseLeftoversRepresentation[];
}
