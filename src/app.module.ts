import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { UserAuthEntity } from "./user/entity/user-auth.entity";
import { UserProfileEntity } from "./user/entity/user-profile.entity";
import { RoleEntity } from "./role/role.entity";
import { TextBlockEntity } from "./text-block/entities/text-block.entity";
import { FileEntity } from "./file/file.entity";
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { TextBlockModule } from './text-block/text-block.module';
import { FileModule } from "./file/file.module";

@Module({
  imports: [
    // Path to .env-file. NB! in package.json add cross-env in scripts start, start:dev.
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    // Connect to database
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [
        UserProfileEntity,
        UserAuthEntity,
        RoleEntity,
        TextBlockEntity,
        FileEntity,
      ],
      autoLoadEntities: true,
      //NB! attr synchronize is not safe for prod, migrations is better.
      synchronize: true,
    }),
    UserModule,
    RoleModule,
    AuthModule,
    TextBlockModule,
    FileModule
  ],
})
export class AppModule {}
