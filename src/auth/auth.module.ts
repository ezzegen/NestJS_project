import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';

// Need packages <npm i @nestjs/jwt bcryptjs>
@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() =>  UserModule), // for prevention error of circular dependency between modules.

    // Registration module JwtModule
    JwtModule.register({
      secret: process.env.PRIVATE_KEY ?? 'SECRET',
      signOptions: {
        expiresIn: '24h' // time of token shelf life
      }
    })
  ],
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AuthModule {}
