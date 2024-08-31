import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ExceptionCode } from 'src/common/enums/exception-code.enum';
import { trimString } from 'src/common/utils/trim-string';

export class UpdateStoreDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ExceptionCode.MUST_BE_STRING })
  @Transform(trimString)
  @IsNotEmpty({ message: ExceptionCode.MUST_BE_FILLED })
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ExceptionCode.MUST_BE_STRING })
  @Transform(trimString)
  @IsNotEmpty({ message: ExceptionCode.MUST_BE_FILLED })
  location?: string;
}
