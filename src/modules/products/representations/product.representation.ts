import { ApiProperty } from '@nestjs/swagger';
import { PriceRepresentation } from './price.representation';
import { StoreLeftoversRepresentation } from './store-leftovers.representation';
import { WarehouseLeftoversRepresentation } from './warehouse-leftovers.representation';
import { SingleProduct } from '../interfaces/single-product.interface';

export class ProductRepresentation {
  constructor(item: SingleProduct) {
    this.id = item.id;
    this.name = item.name;
    this.description = item.description;
    this.categories = item.categories.map((it) => it.category.name);
    this.prices = item.prices.map((it) => new PriceRepresentation(it));
    this.storeLeftovers = item.storeStocks.map(
      (it) => new StoreLeftoversRepresentation(it),
    );
    this.warehouseLeftovers = item.warehouseStocks.map(
      (it) => new WarehouseLeftoversRepresentation(it),
    );
  }

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
