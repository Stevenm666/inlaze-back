import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './schemas/post.schema'

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>){}
  
  create(createPostDto: CreatePostDto) {
    const createdPost = new this.postModel(createPostDto)
    return createdPost.save()

  }

  async findAllByUserId(id: string) {
    return await this.postModel.find({ userId: id, isDeleted: false})
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    return await this.postModel.findOneAndUpdate({ _id : id}, updatePostDto, {new: true});
  }

  async remove(id: string) {
    const updatePost: postDelete = {
      deletedAt: new Date(),
      isDeleted: true
    }

    return await this.postModel.findOneAndUpdate({ _id : id}, updatePost, {new: true});
  }
}
