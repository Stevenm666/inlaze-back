import { HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { UserService } from './../user/user.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { compareSync }  from "bcryptjs";
import { Secret, sign } from 'jsonwebtoken';

export const SECRET_KEY: Secret = 'inlaze';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async create(createAuthDto: CreateAuthDto) {
    const existingUser = await this.userService.findOneByEmail(createAuthDto.email);
    if(existingUser) throw new HttpException({status: HttpStatus.BAD_REQUEST, error: 'This Email is already in use',}, HttpStatus.BAD_REQUEST);
    return this.userService.create(createAuthDto);
  }

  async login(userLogin: userLogin){
    const foundUser = await this.userService.findOneByEmail(userLogin.email);
    if(!foundUser) throw new HttpException({status: HttpStatus.BAD_REQUEST, error: 'Email of user is not correct',}, HttpStatus.BAD_REQUEST);

    const isMatch = compareSync(userLogin.password, foundUser.password)

    if(!isMatch) throw new HttpException({status: HttpStatus.BAD_REQUEST, error: 'Password incorrect',}, HttpStatus.BAD_REQUEST);

    const token = sign({ _id: foundUser._id?.toString(), name: foundUser.fullName }, SECRET_KEY, {
      expiresIn: '1d', //1m
    });

    return { user: { foundUser }, token };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
