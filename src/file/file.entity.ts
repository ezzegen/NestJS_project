import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

import { ISaveFile } from "./file.interface";
import { TextBlockEntity } from "../text-block/entities/text-block.entity";

// Model of table for user's profile.
@Entity({name: 'file'})
export class FileEntity implements ISaveFile{

  @ApiProperty({ example: '1', description: 'Unique id' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ example: '01.01.1970', description: 'File save date' })
  @CreateDateColumn({ type: 'timestamp'})
  createdAt: Date;

  @ApiProperty({ example: 'text_block', description: 'Name table where file is used' })
  @Column({length: 20, type: 'varchar', default: null, nullable: true})
  essenceTable: string;

  @ApiProperty({ example: 'img.jpg', description: 'File name' })
  @Column({ type: 'varchar'})
  fileName: string;

  @OneToOne(
    () => TextBlockEntity,
    (textBlock) => textBlock.file,
    {nullable:true, onDelete: "CASCADE"})
  @JoinColumn({name: 'essenceId'})
  textBlock: TextBlockEntity;
}
