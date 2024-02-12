import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import { HydratedDocument} from 'mongoose'

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true})
  fullName: string

  @Prop({ required: true})
  age: number

  @Prop({ required: true})
  email: string

  @Prop({ required: true})
  password: string

  @Prop()
  posts: number

  @Prop()
  createdAt: Date

  @Prop()
  updatedAt: Date

  @Prop()
  deletedAt: Date

  @Prop({ default: false})
  isDeleted: Boolean
}

export const UserSchema = SchemaFactory.createForClass(User)
