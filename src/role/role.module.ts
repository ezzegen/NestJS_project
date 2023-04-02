import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { RoleEntity } from "./role.entity";

@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports: [
    TypeOrmModule.forFeature([RoleEntity])
  ],
  exports: [RoleService]
})
export class RoleModule {}
