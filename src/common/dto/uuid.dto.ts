import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { ExceptionCode } from '../enums/exception-code.enum';

export class UuidDto {
  @ApiProperty()
  @IsUUID('all', { message: ExceptionCode.MUST_BE_UUID })
  id: string;
}
