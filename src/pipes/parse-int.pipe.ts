import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

// Example to transform data via custom pipe, use built in ParseIntPipe for
// better
@Injectable()
export class ExampleParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validation parse int failed');
    }
    return val;
  }
}
