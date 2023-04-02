import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Repository } from "typeorm";

import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

import { FileEntity } from "./file.entity";

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(
      FileEntity
    ) private fileEntityRepository: Repository<FileEntity>
  ) {
  }

  async uploadFile(
    file,
    tableId: number | null = null,
    nameTable: string | null = null): Promise<FileEntity> {
    try {
      const editedFileName = this.loadAndUpdateFileName(file)
      // save file in the DB file
      const saveFile = await this.fileEntityRepository.save({
        essenceId: tableId,
        essenceTable: nameTable,
        fileName: file
      })

      // update name file
      saveFile.fileName = editedFileName
      return await this.fileEntityRepository.save(saveFile);
    } catch (e) {
        throw new HttpException('Error writing file', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  loadAndUpdateFileName(file) {
    // edit name file
    const editedFileName = uuid.v4() + '.jpg';  // generation of unique file name

    const filePath = path.resolve(__dirname, '..', 'static');

    //path check
    if (!fs.existsSync(path.join(filePath))) {
      console.log(`Path.join -- ${path.join(filePath)}`)
      fs.mkdirSync(filePath, {recursive: true})
    }
    // write file
    fs.writeFileSync(path.join(filePath, editedFileName), file.buffer)
    return editedFileName;
  }

  async deleteUnusedFiles() {
    const file = await this.fileEntityRepository
      .createQueryBuilder("file")
      .where(':startDate - file.createdAt > :hour', {startDate: new Date(), hour: 3600})
      .orWhere({essenceTable: IsNull()})
      .getMany();
    return await this.fileEntityRepository.remove(file);
  }
}

