import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TextBlockService } from './text-block.service';
import { TextBlockController } from './text-block.controller';
import { TextBlockEntity } from './entities/text-block.entity';
import { RoleModule } from '../role/role.module';
import { AuthModule } from '../auth/auth.module';
import { FileModule } from '../file/file.module';
import { FileEntity } from '../file/file.entity';

@Module({
  providers: [TextBlockService],
  controllers: [TextBlockController],
  imports: [
    TypeOrmModule.forFeature([TextBlockEntity, FileEntity]),
    RoleModule,
    AuthModule,
    FileModule
  ],
  exports: [TextBlockService]
})
export class TextBlockModule {}
