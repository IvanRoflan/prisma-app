import { ApiProperty } from '@nestjs/swagger';
import { ShortProductRepresentation } from './short-product.representation';

export class CategoryRepresentation {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ isArray: true, type: ShortProductRepresentation })
  products: ShortProductRepresentation[];
}
