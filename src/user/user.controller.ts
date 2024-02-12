import { Controller, Get, Body, Put, Param, Delete, Res, HttpStatus, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findAll(@Param('id') id: string, @Res() res: Response) {
    try {
      const user = await this.userService.findOne(id);
      res.status(200).send(user)
    } catch (error) {
      res.status(400).send(error)
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Res() res: Response) {
    try {
      const user = await this.userService.update(id, updateUserDto);
      res.status(200).send(user)
    } catch (error) {
      res.status(400).send(error)
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const user = await this.userService.remove(id);
      res.status(200).send(user)
    } catch (error) {
      res.status(400).send(error)
    }
  }
}
