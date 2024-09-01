import { ApiProperty } from '@nestjs/swagger';
import { WarehouseStock } from '@prisma/client';

export class WarehouseLeftoversRepresentation {
  constructor(it: WarehouseStock) {
    this.id = it.id;
    this.quantity = it.quantity;
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  quantity: number;
}
