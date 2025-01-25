import { BadRequestException, Injectable } from '@nestjs/common';
import { ForbiddenException } from 'src/exception/forbidden.exception';
import { CreateNoteDto } from './dto/create-note.dto';

@Injectable()
export class NotesService {
  create(data: CreateNoteDto): string {
    return 'create';
  }

  async findAll(): Promise<string> {
    return Promise.resolve('find all');
  }

  async getSampleList(): Promise<string[]> {
    throw new ForbiddenException();
  }

  // Example using built-in exception
  async getSampleList2(): Promise<string[]> {
    throw new BadRequestException('Something bad happened', {
      cause: new Error(),
      description: 'Some error description',
    });
  }
}
