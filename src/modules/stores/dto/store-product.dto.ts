import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { ExceptionCode } from 'src/common/enums/exception-code.enum';

export class StoreProductDto {
  @ApiProperty()
  @IsUUID('all', { message: ExceptionCode.MUST_BE_UUID })
  storeId: string;

  @ApiProperty()
  @IsUUID('all', { message: ExceptionCode.MUST_BE_UUID })
  productId: string;
}
