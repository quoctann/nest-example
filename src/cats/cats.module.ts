import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';

// This module use as example of Pipe & Guards
@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
