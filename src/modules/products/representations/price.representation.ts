import { ApiProperty } from '@nestjs/swagger';

export class PriceRepresentation {
  @ApiProperty()
  amount: number;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  storeId: string;

  @ApiProperty()
  storeName: string;
}
