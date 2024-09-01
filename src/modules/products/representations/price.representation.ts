import { ApiProperty } from '@nestjs/swagger';
import { ProductPrice } from '../interfaces/product-price.interface';

export class PriceRepresentation {
  constructor(it: ProductPrice) {
    this.amount = it.amount.toNumber();
    this.currency = it.currency;
    this.storeId = it.store.id;
    this.storeName = it.store.name;
  }

  @ApiProperty()
  amount: number;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  storeId: string;

  @ApiProperty()
  storeName: string;
}
