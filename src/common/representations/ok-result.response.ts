import { ApiResponseProperty } from '@nestjs/swagger';

export class OkResponseRepresentation {
  constructor() {
    this.result = 'ok';
  }

  @ApiResponseProperty({ example: 'ok' })
  result: 'ok';
}
