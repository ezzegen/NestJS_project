import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsString, Length, Max, Min } from "class-validator";

export class UserCreateDto {
  @ApiProperty({
    example: '5',
    description: 'Unique identifier (FK + PK) from table user_auth'
  })
  readonly id: number;

  @ApiProperty({example: 'mymail@gmail.com', description: 'Email address (unique)'})
  @IsString({message: 'Always string!' })
  @IsEmail({}, {message: 'Incorrect email address'})
  readonly email: string;

  @ApiProperty({example: 'dsfhkl76JJKSR', description: 'Password'}) // dec for doc
  @IsString({message: 'Always string!' })
  @Length(
    4,
    30,
    {message: 'Count of symbols in the password min 4, max 30'}
  )
  readonly password: string;

  @ApiProperty({example: 'Veronica', description: 'Name'})
  @IsString({message: 'Always string!' })
  @Length(
    4,
    30,
    {message: 'Count of symbols in the password min 4, max 30'}
  )
  readonly name: string;

  @ApiProperty({example: 'Bakhareva', description: 'Surname'})
  @IsString({message: 'Always string!' })
  @Length(
    4,
    30,
    {message: 'Count of symbols in the password min 4, max 30'}
  )
  readonly surname: string;

  @ApiProperty({example: '27', description: 'Age'})
  @IsNumber({},{message: 'Always number!'})
  @Min(12)
  @Max(99)

  readonly age: number;

  @ApiProperty({example: '89030000000', description: 'Phone number.'})
  @IsNumber({}, {message: 'Always number!'})
  @Min(11111111111)
  @Max(99999999999)
  readonly phone: number;
}