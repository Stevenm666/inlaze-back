import { Controller, Get, Post, Body, Put, Param, Delete, Res } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Response } from 'express';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':id')
  async getAllByUserId(@Param('id') id: string, @Res() res: Response){
    try {
      const posts = await this.postService.findAllByUserId(id);
      res.status(200).send(posts)
    } catch (error) {
      res.status(400).send(error.response)
    }
  }

  @Post()
  async create(@Body() createPostDto: CreatePostDto, @Res() res: Response) {
    try {
      const createdPost = await this.postService.create(createPostDto);
      res.status(201).send(createdPost); 
    } catch (error) {
      res.status(400).send(error.response)
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @Res() res: Response) {
    try {
      const updatedPost = await this.postService.update(id, updatePostDto);
      res.status(200).send(updatedPost)
    } catch (error) {
      res.status(400).send(error.response)
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const deletedPost = this.postService.remove(id);
      res.status(200).send('Post deleted successfully')
    } catch (error) {
      res.status(400).send(error.response)
    }
  }
}
