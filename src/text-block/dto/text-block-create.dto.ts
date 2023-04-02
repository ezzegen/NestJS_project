import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class TextBlockCreateDto {

  @ApiProperty({ example: 'main-sale-text', description: 'Unique name for searching' })
  @IsString({ message: 'Always string!' })
  readonly searchKey: string;

  @ApiProperty({example: 'April sales!', description: 'Unique name of text block'})
  @IsString({message: 'Always string!' })
  readonly title: string;

  @ApiProperty({
    example: 'When ordering before the end of April, a 50% discount.',
    description: 'Detailed description of text block'
  })
  @IsString({ message: 'Always string!' })
  readonly txt: string;

  @ApiProperty({
    example: 'sale-logo.png',
    description: 'Image file path or url of img'
  })
  @IsString({ message: 'Always string!' })
  file: any;

  @ApiProperty({
    example: 'main',
    description: 'Group\'s name of the text block'
  })
  @IsString({ message: 'Always string!' })
  readonly group: string;
}