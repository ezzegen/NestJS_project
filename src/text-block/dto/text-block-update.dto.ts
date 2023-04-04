import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class TextBlockUpdateDto {

  @ApiProperty({
    example: 'Brendan',
    description: 'Value for property in auth_profile',
  })
  @IsNumberString({},{ message: 'String or number!' })
  readonly value: string | number;
}