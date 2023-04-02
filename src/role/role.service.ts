import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { RoleCreateDto } from "./role-create.dto";
import { RoleEntity } from "./role.entity";

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(
      RoleEntity
    ) private roleRepository: Repository<RoleEntity>
  ) {
  }

  async createRole(dto: RoleCreateDto): Promise<RoleEntity> {
    return await this.roleRepository.save(dto);
  }

  async getAllRoles(): Promise<RoleEntity[]> {
    return await this.roleRepository.find();
  }

  async getRoleByValue(value: string): Promise<RoleEntity> {
    return await this.roleRepository.findOne({where: {value}});
  }

  async deleteRole(roleId: number): Promise<any> {
    return await this.roleRepository.delete(roleId);
  }
}
