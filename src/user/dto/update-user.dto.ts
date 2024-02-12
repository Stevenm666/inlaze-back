import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  fullName: string
  age: number
  email: string
  password: string
  posts: number
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  isDeleted: Boolean
}
