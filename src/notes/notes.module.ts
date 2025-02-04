import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
// import { APP_FILTER } from '@nestjs/core';

@Module({
  controllers: [NotesController],
  providers: [NotesService],
  // providers: [
  //   {
  //     provide: APP_FILTER,
  //     useClass: HttpExceptionFilter,
  //   },
  // ], // example if we want to use global exception filter
})
export class NotesModule {}
