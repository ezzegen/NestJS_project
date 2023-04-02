import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Length, Min } from "class-validator";

export class RoleAddDto {

  @ApiProperty({example: 'ADMIN', description: 'Unique value of role'})
  @IsString({message: 'Always string!' })
  @Length(
    4,
    15,
    {message: 'Count of symbols in the password min 4, max 30'}
  )
  readonly value: string;

  @ApiProperty({example: '5', description: 'Unique user identifier'})
  @IsNumber({}, {message: 'Always number!'})
  @Min(1)
  readonly userId: number;
}