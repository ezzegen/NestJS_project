import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs';

import { UserCreateDto } from "../user/dto/user-create.dto";
import { UserService } from "../user/user.service";
import { UserAuthEntity } from "../user/entity/user-auth.entity";

@Injectable()
export class AuthService {
  /* injection service from ./user/
  !NB add UserModule in imports auth.module and UserService in exports user.module!
   */
  constructor(
    private userService: UserService,
    private jwtService: JwtService
    ) {
  }

  async login (userDto: UserCreateDto): Promise<object>{
      const user = await this.validateUser(userDto);
      return this.generateToken(user);
  }

  async registration (userDto: UserCreateDto): Promise<object> {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        `User with login ${userDto.email} already exists!`,
        HttpStatus.BAD_REQUEST
        )
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser(({...userDto, password: hashPassword}), );
    return this.generateToken(user);
  }

  private async generateToken(user: UserAuthEntity): Promise<object>{
    const payload = {login: user.email, id: user.id, role: user.role}
    return {
      token: this.jwtService.sign(payload)
    }
  }

  private async validateUser(userDto: UserCreateDto): Promise<UserAuthEntity>{
    const user = await this.userService.getUserByEmail(userDto.email);
    if (user) {
      const passwordEquals = await bcrypt.compare(userDto.password, user.password);
      if (user && passwordEquals) {
        return user;
      }
    }
    throw new UnauthorizedException({ message: 'Incorrect password or login!' })
  }
}
