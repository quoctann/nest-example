import { DataSource } from 'typeorm';
import { Photo } from './entities/photo.entity';

export const photoProvider = [
  {
    provide: 'PHOTO_REPOSITORY', // TODO: should replace by constant
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Photo),
    inject: ['DATA_SOURCE'],
  },
];
