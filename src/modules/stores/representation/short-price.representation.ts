import { ApiProperty } from '@nestjs/swagger';

export class ShortPriceRepresentation {
  @ApiProperty()
  amount: number;

  @ApiProperty()
  currency: string;
}
