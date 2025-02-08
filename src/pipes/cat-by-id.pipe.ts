import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { Cat } from 'src/modules/cats/entities/cat.entity';

@Injectable()
export class CatByIdPipe implements PipeTransform<string, Cat> {
  transform(value: string, metadata: ArgumentMetadata) {
    const catId = parseInt(value, 10);
    if (isNaN(catId)) {
      throw new BadRequestException('Validation parse int failed');
    }
    const data = this.findExisting(catId);
    if (!data) {
      throw new BadRequestException('Cat not found');
    }
    return data;
  }

  private findExisting(id: number): Cat | null {
    const CAT_ID_LIST = [10, 20, 30];
    if (CAT_ID_LIST.includes(id)) {
      return new Cat('josh', 10, 'orange');
    }
    return null;
  }
}
