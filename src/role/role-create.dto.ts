import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class RoleCreateDto {
  @ApiProperty({ example: 'ADMIN', description: 'Unique value of role' })
  @IsString({ message: 'Always string!' })
  readonly value: string;

  @ApiProperty({ example: 'Administrator', description: 'Description of role' })
  @IsString({ message: 'Always string!' })
  readonly description: string;
}