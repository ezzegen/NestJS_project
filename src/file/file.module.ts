import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { FileController } from './file.controller';
import { FileService } from './file.service';
import { FileEntity } from './file.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [FileController],
  providers: [FileService],
  imports: [
    TypeOrmModule.forFeature([FileEntity]),
    JwtModule,
    AuthModule
  ],
  exports: [FileService]
})
export class FileModule {}
