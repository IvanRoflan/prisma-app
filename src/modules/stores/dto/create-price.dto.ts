import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { ExceptionCode } from 'src/common/enums/exception-code.enum';
import { trimString } from 'src/common/utils/trim-string';

export class CreatePriceDto {
  @ApiProperty()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 }, { message: ExceptionCode.MUST_BE_NUMBER })
  @Min(0.01, { message: ExceptionCode.MUST_BE_MIN })
  amount: number;

  @ApiProperty()
  @IsString({ message: ExceptionCode.MUST_BE_STRING })
  @Transform(trimString)
  @IsNotEmpty({ message: ExceptionCode.MUST_BE_FILLED })
  currency: string;
}
