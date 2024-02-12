import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './schemas/user.schema'
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { hash }  from "bcryptjs";

const saltRounds: number = 12

@Module({
  //function on module to hash the password when create the user
  imports: [MongooseModule.forFeatureAsync([{ name: User.name, useFactory: () => { const schema = UserSchema; schema.pre('save',async function(next) {
    const user = this;
    if (user.isModified('password')) {
      user.password = await hash(user.password, saltRounds);
    }
    next();
  });
  return schema
 }}])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
