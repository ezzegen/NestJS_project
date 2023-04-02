import { Entity, Column, PrimaryGeneratedColumn, ManyToMany} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

import { IRoleCreationAttrs } from "./role.inteface";
import { UserAuthEntity } from "../user/entity/user-auth.entity";

// Model of table for user's profile.
@Entity({name: 'role'})
export class RoleEntity implements IRoleCreationAttrs {

  @ApiProperty({ example: '1', description: 'Unique identifier' }) // dec for doc
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @ApiProperty({ example: 'ADMIN', description: 'Unique value of role' })
  @Column({ length: 20, unique: true})
  value: string;

  @ApiProperty({ example: 'Administrator', description: 'Description of role' })
  @Column({ length: 20 })
  description: string;

  @ManyToMany(
    () => UserAuthEntity,
    (auth) => auth.role,
    {onDelete: "CASCADE"})
  auth: UserAuthEntity[];
}
