import { Body, Controller, Delete, Get, Param, Post, UsePipes } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { RoleService } from "./role.service";
import { RoleCreateDto } from "./role-create.dto";
import { RoleEntity } from "./role.entity";
import { ValidationPipe } from "../pipes/validation.pipe";

@ApiTags('Roles Info')
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {} // injection service

  @ApiOperation({summary: 'Creating role'})  //dec for doc, description
  @ApiResponse({status: 201, type: RoleEntity})  //dec for doc
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() dto: RoleCreateDto): Promise<RoleEntity> {
    return this.roleService.createRole(dto);
  }

  @ApiOperation({summary: 'Getting all roles'})
  @ApiResponse({status: 200, type: [RoleEntity]})
  @Get()
  getAllRoles(): Promise<RoleEntity[]> {
    return this.roleService.getAllRoles();
  }

  @ApiOperation({summary: 'Getting all roles'})
  @ApiResponse({status: 200, type: [RoleEntity]})
  @Get('/:value')
  getByValue(@Param('value') value: string): Promise<RoleEntity> {
    return this.roleService.getRoleByValue(value);
  }

  @Delete(':id')
  deleteRole (@Param() param): Promise<any> {
    return this.roleService.deleteRole(+param.id);
  }
}
