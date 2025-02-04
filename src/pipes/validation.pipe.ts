import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

// PipeTransform with input value type T and return of transform() type R as
// result
@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    // these can't have validation decorators attached, so there's no reason to
    // run them through the validation step
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }

    return value;
  }

  private toValidate(metadataType: Function): boolean {
    // const types: Function[] = [String, Boolean, Number, Array, Object];
    // return !types.includes(metadataType);

    return false;
  }
}
