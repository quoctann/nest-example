import { Module } from '@nestjs/common';
import { DatabaseConfigService } from 'src/config/database.config';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

// This module use as example of Pipe & Guards
@Module({
  controllers: [CatsController],
  providers: [CatsService, DatabaseConfigService],
})
export class CatsModule {}
