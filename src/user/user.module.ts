import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserAuthEntity } from './entity/user-auth.entity';
import { RoleEntity } from "../role/role.entity";
import { UserProfileEntity } from "./entity/user-profile.entity";
import { RoleModule } from "../role/role.module";
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([UserAuthEntity, UserProfileEntity, RoleEntity]),
    RoleModule,
    forwardRef(() => AuthModule)
  ],
  exports: [
    UserService
  ]
})
export class UserModule {}
