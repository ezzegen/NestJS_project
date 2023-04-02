import { Body, Controller, Get, Patch, Post, Delete, UseGuards, Param, UsePipes } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { UserService } from "./user.service";
import { UserProfileEntity } from "./entity/user-profile.entity";
import { UserAuthEntity } from "./entity/user-auth.entity";
import { RoleAddDto } from "./dto/role-add.dto";
import { UserUpdateDto } from "./dto/user-update.dto";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { RoleAuthGuard } from "../auth/guard/role-auth.guard";
import { Roles } from "../auth/auth-roles.decorator";
import { ValidationPipe } from "../pipes/validation.pipe";


@ApiTags('Users Info')  // dec for doc, grouping endpoints into the controller
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {
  }

  @ApiOperation({summary: 'Getting all user'})
  @ApiResponse({status: 200, type: [UserAuthEntity]})
  @UseGuards(JwtAuthGuard)
  @Get('/')
  getAllUsers(): Promise<UserProfileEntity[]> {
    return this.userService.getAllUsers();
  }

  @ApiOperation({summary: 'Getting user by id'})
  @ApiResponse({status: 200, type: UserAuthEntity})
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOneUser(@Param() param): Promise<UserProfileEntity>  {
    return this.userService.getOneUser(+param.id);
  }

  @ApiOperation({summary: 'Distribution of roles'})
  @ApiResponse({status: 201})
  @Roles('ADMIN')
  @UseGuards(RoleAuthGuard)
  @UsePipes(ValidationPipe)
  @Post('/role')
  addRoleToUser(@Body() dto: RoleAddDto): Promise<UserAuthEntity> {
    return this.userService.addRoleToUser(dto);
  }

  @ApiOperation({summary: 'Update user'})
  @Roles('ADMIN')
  @UseGuards(RoleAuthGuard)
  @Patch(':id')
  updateUser (@Param() param, @Body() dto: UserUpdateDto): Promise<UserProfileEntity | null> {
    return this.userService.updateUser(+param.id, dto);
  }

  @ApiOperation({summary: 'Delete user'})
  @Roles('ADMIN')
  @UseGuards(RoleAuthGuard)
  @Delete(':id')
  deleteUser (@Param() param): Promise<any> {
    return this.userService.deleteUser(+param.id);
  }
}
