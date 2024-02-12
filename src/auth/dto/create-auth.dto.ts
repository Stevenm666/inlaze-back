import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  fullName: string

  @IsNumber()
  @IsNotEmpty()
  age: number

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string

  posts: number
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  isDeleted: Boolean
}
