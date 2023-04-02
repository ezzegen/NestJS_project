import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToMany, JoinTable } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

import { IUserCreationAuthAttrs } from "../user.interface";
import { UserProfileEntity } from "./user-profile.entity";
import { RoleEntity } from "../../role/role.entity";

// Model of table for user's authorization
@Entity({name: 'user_auth'})
export class UserAuthEntity implements IUserCreationAuthAttrs{

  @ApiProperty({example: '1', description: 'Unique identifier'}) // dec for doc
  @PrimaryGeneratedColumn({ type: 'int', primaryKeyConstraintName: 'pk_user_id'})
  id: number;
  @OneToOne(
    () => UserProfileEntity,
    (profile) => profile.auth,
    {cascade: true, onDelete: "CASCADE"}
  )
  profile: UserProfileEntity

  @ApiProperty({example: 'mymail@gmail.com', description: 'Email address (unique)'})
  @Column({
    length: 30,
    unique: true,
  })
  email: string;

  @ApiProperty({example: 'dsfhkl76JJKSR', description: 'Password'})
  @Column({
    length: 100,
  })
  password: string;

  @ManyToMany(
    () => RoleEntity,
    (role) => role.auth,
    { cascade: true, onDelete: "CASCADE"}
  )
  @JoinTable()
  role: RoleEntity[];
}