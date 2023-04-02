import { Entity, Column, PrimaryColumn, Check, OneToOne, JoinColumn} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

import { UserAuthEntity } from "./user-auth.entity";
import { IUserCreationProfileAttrs } from "../user.interface";

// Model of table for user's profile.
@Entity({name: 'user_profile'})
@Check(`"age" > 10`)
@Check(`"phone" > 10000000000`)
@Check(`"phone" < 99999999999`)
export class UserProfileEntity implements IUserCreationProfileAttrs{

  @ApiProperty({example: '1', description: 'Unique identifier (FK + PK) from table user_auth'}) // dec for doc
  @PrimaryColumn() // Column id = PK + FK
  id: number
  @OneToOne(() => UserAuthEntity,
    (auth) => auth.profile,
    {onDelete: "CASCADE"})  // return class of entity UserAuthEntity
  @JoinColumn({ name: 'id'}) // this table is main
  auth: UserAuthEntity;

  @ApiProperty({example: 'Veronica', description: 'Name'})
  @Column({length: 20, default: 'Your name'})
  name: string;

  @ApiProperty({example: 'Bakhareva', description: 'Surname'})
  @Column({length: 20, default: 'Your surname'})
  surname: string;

  @ApiProperty({example: '27', description: 'Age'})
  @Column({type: 'integer', default: 18})
  age: number;

  @ApiProperty({example: '89030000000', description: 'Phone number.'})
  @Column({type: 'bigint', nullable: true})
  phone: number;
}