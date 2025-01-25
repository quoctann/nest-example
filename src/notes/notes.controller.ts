import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { NotesService } from './notes.service';
import { QueryNotesDTO } from './dto/query-notes.dto';
import { UpdateNoteDTO } from './dto/update-note.dto';

/**
 * This example how to use controller
 */
@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  // Example exception handling
  @Get('ex')
  async getSampleList() {
    try {
      const data = await this.notesService.getSampleList();
      console.log(data);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'this is custom message',
        },
        HttpStatus.FORBIDDEN,
        { cause: error },
      );
    }
  }

  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    this.notesService.create(createNoteDto);
  }

  @Get()
  findAll(@Query() query: QueryNotesDTO) {
    return `This action returns all notes (limit: ${query.id} items)`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} note`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateNoteDTO: UpdateNoteDTO) {
    const { id: updateId } = updateNoteDTO;
    return `This action updates a #${id} note, body ID ${updateId}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} note`;
  }
}
