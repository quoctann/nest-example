import { Module } from '@nestjs/common';
import { PhotoService } from './photos.service';

@Module({
  providers: [PhotoService],
})
export class PhotosModule {}
