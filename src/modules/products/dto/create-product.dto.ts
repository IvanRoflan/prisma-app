import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ExceptionCode } from 'src/common/enums/exception-code.enum';
import { trimString } from 'src/common/utils/trim-string';

export class CreateProductDto {
  @ApiProperty()
  @IsString({ message: ExceptionCode.MUST_BE_STRING })
  @Transform(trimString)
  @IsNotEmpty({ message: ExceptionCode.MUST_BE_FILLED })
  name: string;

  @ApiProperty()
  @IsArray({ message: ExceptionCode.MUST_BE_ARRAY })
  @ArrayMinSize(1, { message: ExceptionCode.MUST_BE_FILLED })
  @IsUUID('all', { each: true, message: ExceptionCode.MUST_BE_UUID })
  categories: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ExceptionCode.MUST_BE_STRING })
  @Transform(trimString)
  @IsNotEmpty({ message: ExceptionCode.MUST_BE_FILLED })
  description?: string;
}
