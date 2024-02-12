import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  title: string
  content: string
  likes: number
  userId: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  isDeleted: Boolean
}
