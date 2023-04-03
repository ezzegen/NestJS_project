import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { TextBlockCreateDto } from "./dto/text-block-create.dto";
import { TextBlockEntity } from "./entities/text-block.entity";
import { TextBlockUpdateDto } from "./dto/text-block-update.dto";
import { FileService } from "../file/file.service";
import { FileEntity } from "../file/file.entity";

@Injectable()
export class TextBlockService {
  constructor(
    @InjectRepository(
      TextBlockEntity
    ) private textBlockRepository: Repository<TextBlockEntity>,
    @InjectRepository(
      FileEntity
    ) private fileEntityRepository: Repository<FileEntity>,
    private fileService: FileService
  ) {}

  async createTextBlock (
    dto: TextBlockCreateDto,
    imgFile: any,
    ): Promise<TextBlockEntity> {
    // Saving data in table 'text_block'
    const textBlock = await this.textBlockRepository.save({ ... dto})

    // Get arguments for a function to write file information to the 'file' table.
    const textBlockId = await this.textBlockRepository.getId(textBlock)
    const nameTable = 'text_block';

    // Call func from fileService and getting new file name.
    const imgName = await this.fileService.uploadFile(imgFile, textBlockId, nameTable);

    // Rewrite new file-name in table 'text_block'
    textBlock.file = imgName;
    return await this.textBlockRepository.save(textBlock);

  }

  async getTextBlock (key: string): Promise<TextBlockEntity[] | TextBlockEntity>{
    // Searching block by unique search_key.
    if (key) {
      return await this.textBlockRepository.findOne({
        where: { searchKey: key },
        relations: {file: true}
      });
    }
    return await this.textBlockRepository.find({relations: {file: true}});
  }

  async getTextBlockByGroup(group_name: string): Promise<TextBlockEntity[]> {
    // Filter blocks by group
    return await this.textBlockRepository.find({
      where: {group: group_name},
      relations: {file: true}
    });
  }

  async updateTextBlock(
    blockId: number,
    property: string,
    dto: TextBlockUpdateDto): Promise<any> {
    // Update block using query key 'property'
    return await this.textBlockRepository.update(
      {id: blockId }, {[property]: dto.value})
  }

  async deleteTextBlock(blockId: number): Promise<any> {
    return await this.textBlockRepository.delete(blockId);
  }
}
