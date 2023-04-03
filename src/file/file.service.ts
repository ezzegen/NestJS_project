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

      // Save file in the table file
      const saveFile = await this.fileEntityRepository.save({
        essenceId: tableId,
        essenceTable: nameTable,
        fileName: file
      })

      // Encode file name
      saveFile.fileName = editedFileName
      return await this.fileEntityRepository.save(saveFile);
    } catch (e) {
        throw new HttpException('Error writing file', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  loadAndUpdateFileName(file) {
    // Edit name file
    const editedFileName = uuid.v4() + '.jpg';  // generation of unique file name
    const filePath = path.resolve(__dirname, '..', 'static');

    // Path check
    if (!fs.existsSync(path.join(filePath))) {
      fs.mkdir(filePath, {recursive: true}, (err) => {
        if (err) throw err;
        console.log(`Directory ${filePath} successfully created.`)
      })
    }

    // Write file
    fs.writeFile(path.join(filePath, editedFileName), file.buffer, (err) => {
      if (err) throw err;
      console.log(`File ${editedFileName} successfully wrote in ${filePath}`)
    })
    return editedFileName;
  }

  async deleteUnusedFiles() {
    // Search files by criteria.
    const file = await this.fileEntityRepository
      .createQueryBuilder("file")
      .where(':startDate - file.createdAt > :hour', {startDate: new Date(), hour: 3600})
      .orWhere({essenceTable: IsNull()})
      .getMany();

    // Deleting files from /static
    file.forEach((obj: FileEntity) => {
      const pathFile = path.resolve(__dirname, '..', 'static', obj.fileName);
      fs.unlink(pathFile, err => {
        if(err) throw err;
        console.log(`File ${pathFile} successfully deleted.`);
      });
    });

    return await this.fileEntityRepository.remove(file);
  }
}
