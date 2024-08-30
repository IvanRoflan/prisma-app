import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Order } from '../enums/order.enum';
import { ExceptionCode } from '../enums/exception-code.enum';

export class PageOptionsDto {
  @ApiPropertyOptional({ enum: Order, default: Order.DESC })
  @IsOptional()
  @IsEnum(Order, { message: ExceptionCode.MUST_BE_ENUM })
  readonly order: Order = Order.DESC;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: ExceptionCode.MUST_BE_INT })
  @Min(1, { message: ExceptionCode.MUST_BE_MIN })
  readonly page: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 300,
    default: 300,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: ExceptionCode.MUST_BE_INT })
  @Min(1, { message: ExceptionCode.MUST_BE_MIN })
  @Max(300, { message: ExceptionCode.MUST_BE_MAX })
  readonly take: number = 300;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
