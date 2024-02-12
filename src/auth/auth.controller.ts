import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from './../user/user.service';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private  userService: UserService) {}

  @Post('/register')
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const registered = await this.authService.create(createUserDto);
      res.status(201).send(registered);
    } catch (error) {
      res.status(400).send(error.response);
    }
  }

  @Post('/login')
  async login(@Body() userLogin: userLogin, @Res() res: Response) {
    try {
      const foundUser = await this.authService.login(userLogin);  
      res.status(200).send(foundUser);
    } catch (error) {
      res.status(400).send(error.response)
    }
  }
}
