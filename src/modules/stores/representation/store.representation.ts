import { ApiProperty } from '@nestjs/swagger';
import { StockProductRepresentation } from './stock-product.representation';

export class StoreRepresentation {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  location: string;

  @ApiProperty({ isArray: true, type: StockProductRepresentation })
  products: StockProductRepresentation[];
}
