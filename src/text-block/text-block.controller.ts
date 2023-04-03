import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  UseGuards,
  Patch,
  Param,
  Delete,
  UseInterceptors, UploadedFile
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";

import { TextBlockService } from "./text-block.service";
import { TextBlockCreateDto } from "./dto/text-block-create.dto";
import { TextBlockUpdateDto } from "./dto/text-block-update.dto";
import { TextBlockEntity } from "./entities/text-block.entity";
import { Roles } from "../auth/auth-roles.decorator";
import { RoleAuthGuard } from "../auth/guard/role-auth.guard";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";

@ApiTags('Text Blocks')
@Controller('content')
export class TextBlockController {
  constructor(
    private textBlockService: TextBlockService,
    ) {}

  @ApiOperation({summary: 'Creating text block'})  //dec for doc, description
  @ApiResponse({status: 201, type: TextBlockEntity})  //dec for doc
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  createTextBlock(
    @Body() dto: TextBlockCreateDto,
    @UploadedFile() file
  ): Promise<TextBlockEntity> {
    return this.textBlockService.createTextBlock(dto, file);
  }

  @ApiOperation({summary: 'All text blocks or one if there is a query searchKey'})
  @ApiResponse({status: 200})
  @Get('/')
  getTextBlock(@Query(
    'searchKey'
  ) searchKey: string | undefined = undefined): Promise<TextBlockEntity[] | TextBlockEntity> {
    return this.textBlockService.getTextBlock(searchKey);
  }

  @ApiOperation({summary: 'Filter by group'})
  @ApiResponse({status: 200})
  @Get('group')
  getTextBlockByGroup(@Query('group') group: string): Promise<TextBlockEntity[]> {
    return this.textBlockService.getTextBlockByGroup(group);
  }

  @ApiOperation({summary: 'Update text block. Only for ADMIN.'})
  @Roles('ADMIN')
  @UseGuards(RoleAuthGuard)
  @Patch(':id')
  updateTextBlock(
    @Param() param,
    @Query('property') property: string,
    @Body() dto: TextBlockUpdateDto): Promise<any>{
    return this.textBlockService.updateTextBlock(+param.id, property, dto);
  }

  @ApiOperation({summary: 'Delete text block. Only for ADMIN.'})
  @ApiResponse({status: 205})
  @Roles('ADMIN')
  @UseGuards(RoleAuthGuard)
  @Delete(':id')
  deleteTextBlock (@Param() param): Promise<any> {
    return this.textBlockService.deleteTextBlock(+param.id);
  }
}
