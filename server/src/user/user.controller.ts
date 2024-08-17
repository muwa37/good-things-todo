import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './user.dto';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() createUserDTO: CreateUserDTO) {
    return this.userService.create(createUserDTO);
  }
}
