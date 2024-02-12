import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import { HydratedDocument} from 'mongoose'

export type PostDocument = HydratedDocument<Post>;

@Schema({ timestamps: true })
export class Post {
  @Prop({ required: true})
  title: string

  @Prop({ required: true})
  content: string

  @Prop({ default: 0})
  likes: number

  @Prop({ required: true})
  userId: string

  @Prop()
  createdAt: Date

  @Prop()
  updatedAt: Date

  @Prop({ default: null})
  deletedAt: Date

  @Prop({ default: false})
  isDeleted: Boolean
}

export const PostSchema = SchemaFactory.createForClass(Post)
