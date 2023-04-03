import { Body, Controller, Delete, Get, Param, Post, UseGuards, UsePipes } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { RoleService } from "./role.service";
import { RoleCreateDto } from "./role-create.dto";
import { RoleEntity } from "./role.entity";
import { ValidationPipe } from "../pipes/validation.pipe";
import { Roles } from "../auth/auth-roles.decorator";
import { RoleAuthGuard } from "../auth/guard/role-auth.guard";

@ApiTags('Roles Info')
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {} // injection service

  @ApiOperation({summary: 'Creating role. Only for ADMIN.'})  //dec for doc, description
  @ApiResponse({status: 201, type: RoleEntity})  //dec for doc
  @Roles('ADMIN')
  @UseGuards(RoleAuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() dto: RoleCreateDto): Promise<RoleEntity> {
    return this.roleService.createRole(dto);
  }

  @ApiOperation({summary: 'Getting all roles. Only for ADMIN.'})
  @ApiResponse({status: 200, type: [RoleEntity]})
  @Roles('ADMIN')
  @UseGuards(RoleAuthGuard)
  @Get()
  getAllRoles(): Promise<RoleEntity[]> {
    return this.roleService.getAllRoles();
  }

  @ApiOperation({summary: 'Getting all roles.  Only for ADMIN.'})
  @ApiResponse({status: 200, type: [RoleEntity]})
  @Roles('ADMIN')
  @UseGuards(RoleAuthGuard)
  @Get('/:value')
  getByValue(@Param('value') value: string): Promise<RoleEntity> {
    return this.roleService.getRoleByValue(value);
  }

  @ApiOperation({summary: 'Delete role. Only for ADMIN.'})
  @ApiResponse({status: 205})
  @Roles('ADMIN')
  @UseGuards(RoleAuthGuard)
  @Delete(':id')
  deleteRole (@Param() param): Promise<any> {
    return this.roleService.deleteRole(+param.id);
  }
}
