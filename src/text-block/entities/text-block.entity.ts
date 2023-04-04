import {
  Entity,
  Column,
  PrimaryGeneratedColumn, OneToOne

} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { ICreationTextBlock } from '../text-block.interface';
import { FileEntity } from '../../file/file.entity';

@Entity({ name: 'text_block' })
export class TextBlockEntity implements ICreationTextBlock  {

  @ApiProperty({
    example: '1',
    description: 'Unique identifier',
  }) // dec for doc
  @PrimaryGeneratedColumn({
    type: 'int',
    primaryKeyConstraintName: 'pk_txt_block_id',
  })
  id: number;

  @ApiProperty({
    example: 'promo-sale-text',
    description: 'Unique name for searching',
  })
  @Column({ length: 30, unique: true })
  searchKey: string;

  @ApiProperty({
    example: 'April sales!',
    description: 'Title of text',
  })
  @Column({ length: 50, unique: true })
  title: string;

  @ApiProperty({
    example: 'When ordering before the end of April, a 50% discount.',
    description: 'Main text-block',
  })
  @Column({ type: "text" })
  txt: string;

  @ApiProperty({
    example: 'sale-logo.png',
    description: 'Image file path or url of img',
  })
  @OneToOne(
    () => FileEntity,
    (file) => file.textBlock,
    { cascade: true, onDelete: "CASCADE", nullable: true })
  file: FileEntity;

  @ApiProperty({
    example: 'main-page',
    description: 'Group\'s name of the text block',
  })
  @Column()
  group: string;
}