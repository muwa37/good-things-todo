import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { FriendDTO, UserDTO } from './user.dto';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() createUserDTO: UserDTO) {
    return this.userService.create(createUserDTO);
  }

  @Get('/search')
  searchByTag(@Query('query') query: string) {
    return this.userService.searchByTag(query);
  }

  @Get('/getFriends/:id')
  async getFriendsById(@Param('id') id: ObjectId) {
    return await this.userService.getFriendsById(id);
  }

  @Get(':id')
  async getOneById(@Param('id') id: ObjectId) {
    return await this.userService.getOneById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: ObjectId, @Body() updateUserDTO: UserDTO) {
    return await this.userService.update(id, updateUserDTO);
  }

  @Patch('/addFriend/:id')
  async addFriend(@Param('id') id: ObjectId, @Body() friendDTO: FriendDTO) {
    return await this.userService.addFriend(id, friendDTO.friendId);
  }

  @Delete(':id')
  async delete(@Param('id') id: ObjectId) {
    return await this.userService.delete(id);
  }
}
