import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  description: string;

  @Column()
  fileName: string;

  @Column('int')
  views: number;

  @Column()
  isPublished: string;
}
