import { ApiProperty } from '@nestjs/swagger';

export class StoreLeftoversRepresentation {
  @ApiProperty()
  quantity: number;

  @ApiProperty()
  storeId: string;

  @ApiProperty()
  storeName: string;
}
