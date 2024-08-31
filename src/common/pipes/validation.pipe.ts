import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (
      metadata.type === 'custom' ||
      metadata.metatype!.toString().startsWith('function')
    ) {
      return value;
    }

    const obj = plainToClass(metadata.metatype!, value || {});
    const errors = await validate(obj, {
      transform: true,
    });

    if (errors.length) {
      const error = errors[0];
      const message = Object.values(error.constraints!)
        .map((it) => {
          return `${it}: ${error.property}`;
        })
        .join(', ');

      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }

    return obj;
  }
}
