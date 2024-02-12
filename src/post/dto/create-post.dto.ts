import { IsString, IsNumber} from 'class-validator'

export class CreatePostDto {
  @IsString()
  title: string

  @IsString()
  content: string
  
  @IsString()
  userId: string
  
  likes: number
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  isDeleted: Boolean
}
