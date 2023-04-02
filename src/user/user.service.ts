import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserProfileEntity } from "./entity/user-profile.entity";
import { UserAuthEntity } from "./entity/user-auth.entity";
import { UserCreateDto } from "./dto/user-create.dto";
import { RoleAddDto } from "./dto/role-add.dto";
import { UserUpdateDto } from "./dto/user-update.dto";
import { RoleService } from "../role/role.service";

@Injectable()
export class UserService {
  constructor(
    // Injecting tables.
    // Repository is just like EntityManager but its operations are limited to a concrete entity.
    @InjectRepository(
      UserProfileEntity
    ) private userProfileRepository: Repository<UserProfileEntity>,
    @InjectRepository(
      UserAuthEntity
    ) private userAuthRepository: Repository<UserAuthEntity>,
    // NB! Add RoleService in <exports> role.module and RoleModule in <imports> user.module!
    private roleService: RoleService,
  ) {
  }

  async createUser(dto: UserCreateDto): Promise<UserAuthEntity>{
    let user_role = await this.roleService.getRoleByValue('USER')
    if (dto.email == process.env.SUPER_USER) {
      user_role = await this.roleService.getRoleByValue('ADMIN')
    }
    const user_auth = await this.userAuthRepository.save({
      email: dto.email,
      password: dto.password,
      role: [user_role],
      relations: { role: true }
    });
    const user_profile = await this.userProfileRepository.save({
        id: await this.userAuthRepository.getId(user_auth),
        name: dto.name,
        surname: dto.surname,
        age: dto.age,
        phone: dto.phone,
      }
    )
    return user_auth;
  }

  async getAllUsers(): Promise<UserProfileEntity[]> {
    return await this.userProfileRepository.find();
  }

  async getOneUser(user_id: number): Promise<UserProfileEntity | null>{
    return await this.userProfileRepository.findOne({where: {id: user_id}});
  }

  async getUserByEmail(email: string): Promise<UserAuthEntity | null> {
    const user = await this.userAuthRepository.findOne({
      where: { email },
      relations: {
        profile: true,
        role: true // Bidirectional relations one-to-one
      }
    })
    return user;
  }

  async addRoleToUser(dto: RoleAddDto): Promise<UserAuthEntity>{
    const user = await this.userAuthRepository.findOne({
      where: { id: dto.userId },
      relations: { role: true }
    });
    const user_role = await this.roleService.getRoleByValue(dto.value);
    if (user_role && user) {
      user.role.push(user_role)
      await this.userAuthRepository.save(user);
      return user;
    }
    throw new HttpException('User or role are not found', HttpStatus.NOT_FOUND)
  }

  async updateUser(user_id: number, dto: UserUpdateDto): Promise<UserProfileEntity | null>{
    const user = await this.userProfileRepository.findOne({where: { id: user_id}});
    if (!user) {
      throw new HttpException('User are not found', HttpStatus.NOT_FOUND)
    }
    try {
      user[dto.property] = dto.value;
      return await this.userProfileRepository.save(user);
    } catch (e) {
      throw new HttpException('Data is not validated!', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async deleteUser(user_id: number): Promise<any>{
    return await this.userAuthRepository.delete(user_id);
  }
}
