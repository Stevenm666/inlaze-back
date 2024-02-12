import { Model } from 'mongoose';
import { HttpStatus, HttpException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema'
import { hash } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>){}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save()
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    const user = await this.userModel.findOne({ _id : id}).exec();
    if(!user) throw new HttpException({status: HttpStatus.BAD_REQUEST, error: 'user does not exists',}, HttpStatus.BAD_REQUEST);
    return user
  }

  findOneByEmail(email: string) {
    return this.userModel.findOne({ email: email}).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if(updateUserDto.password){
      updateUserDto.password = await hash(updateUserDto.password, 12)
    }
    const updatedUser = await this.userModel.findOneAndUpdate({ _id : id}, updateUserDto, {new: true});
    if(!updatedUser) throw new HttpException({status: HttpStatus.BAD_REQUEST, error: 'user does not exists',}, HttpStatus.BAD_REQUEST);
    return updatedUser
  }

  async remove(id: string) {
    const updateUserDto: userDelete = {
      deletedAt: new Date(),
      isDeleted: true
    }

    const deletedUser = await this.userModel.findOneAndUpdate({ _id : id}, updateUserDto, {new: true});
    if(!deletedUser) throw new HttpException({status: HttpStatus.BAD_REQUEST, error: 'user does not exists',}, HttpStatus.BAD_REQUEST);
    return deletedUser
  }
}
