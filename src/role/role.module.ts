import {  Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { RoleEntity } from './role.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports: [
    TypeOrmModule.forFeature([RoleEntity]),
    AuthModule,
  ],
  exports: [RoleService]
})
export class RoleModule {}
