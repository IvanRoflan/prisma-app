import { ApiProperty } from '@nestjs/swagger';

export class WarehouseLeftoversRepresentation {
  @ApiProperty()
  id: string;

  @ApiProperty()
  quantity: number;
}
