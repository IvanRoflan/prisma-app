import { ApiProperty } from '@nestjs/swagger';
import { ShortPriceRepresentation } from './short-price.representation';

export class StockProductRepresentation {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: String })
  description: string | null;

  @ApiProperty()
  quantity: number;

  @ApiProperty({ isArray: true, type: ShortPriceRepresentation })
  prices: ShortPriceRepresentation[];
}
