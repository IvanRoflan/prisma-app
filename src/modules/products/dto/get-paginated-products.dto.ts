import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { ExceptionCode } from 'src/common/enums/exception-code.enum';

export class GetPaginatedProductsDto extends PageOptionsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID('all', { message: ExceptionCode.MUST_BE_UUID })
  categoryId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID('all', { message: ExceptionCode.MUST_BE_UUID })
  storeId?: string;
}
