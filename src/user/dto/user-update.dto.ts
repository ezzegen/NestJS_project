import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, IsString } from "class-validator";

export class UserUpdateDto {
  @ApiProperty({example: 'name', description: 'Property for update in auth_profile'})
  @IsString({message: 'Always string!' })
  readonly property: string;

  @ApiProperty({example: 'Brendan', description: 'Value for property in auth_profile'})
  @IsNumberString({},{message: 'String or number!' })
  readonly value: string | number;
}