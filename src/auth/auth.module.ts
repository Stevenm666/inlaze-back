import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './../user/schemas/user.schema'
import { hash }  from "bcryptjs";

const saltRounds: number = 12

@Module({
  imports:[MongooseModule.forFeatureAsync([{ name: User.name, useFactory: () => { const schema = UserSchema; schema.pre('save',async function(next) {
    const user = this;
    if (user.isModified('password')) {
      user.password = await hash(user.password, saltRounds);
    }
    next();
  });
  return schema
 }}])],
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule {}
