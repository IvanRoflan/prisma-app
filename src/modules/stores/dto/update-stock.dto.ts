import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNumber } from 'class-validator';
import { ExceptionCode } from 'src/common/enums/exception-code.enum';

export class UpdateStockDto {
  @ApiProperty()
  @Type(() => Number)
  @IsNumber({}, { message: ExceptionCode.MUST_BE_NUMBER })
  @IsInt({ message: ExceptionCode.MUST_BE_INT })
  quantity: number;
}
