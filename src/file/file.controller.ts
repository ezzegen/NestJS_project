import { Controller, Delete, Get, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";

import { FileService } from "./file.service";
import { FileEntity } from "./file.entity";
import { RoleAuthGuard } from "../auth/guard/role-auth.guard";
import { Roles } from "../auth/auth-roles.decorator";

@ApiTags('File uploading')
@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {
  }

  @ApiOperation({summary: 'Uploading file. Only for authorized users'})  //dec for doc, description
  @ApiResponse({status: 201, type: FileEntity})  //dec for doc
  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file')
  )
  uploadFile(
    @UploadedFile() file: Express.Multer.File): Promise<FileEntity>{
    return this.fileService.uploadFile(file);
  }

  @ApiOperation({summary: 'Delete unused files. Only for ADMIN.'})
  @ApiResponse({status: 205})
  @Roles('ADMIN')
  @UseGuards(RoleAuthGuard)
  @Delete('/clear')
  deleteTextBlock (): Promise<any> {
    return this.fileService.deleteUnusedFiles();
  }
}
