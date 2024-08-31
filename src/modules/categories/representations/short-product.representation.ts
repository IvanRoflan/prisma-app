import { ApiProperty } from '@nestjs/swagger';

export class ShortProductRepresentation {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}
