import { ApiProperty } from '@nestjs/swagger';
import { ProductStoreStock } from '../interfaces/product-store-stock.interface';

export class StoreLeftoversRepresentation {
  constructor(it: ProductStoreStock) {
    this.quantity = it.quantity;
    this.storeId = it.store.id;
    this.storeName = it.store.name;
  }

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  storeId: string;

  @ApiProperty()
  storeName: string;
}
