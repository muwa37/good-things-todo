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
  getFriendsById(@Param('id') id: ObjectId) {
    return this.userService.getFriendsById(id);
  }

  @Get(':id')
  getOneById(@Param('id') id: ObjectId) {
    return this.userService.getOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() updateUserDTO: UserDTO) {
    return this.userService.update(id, updateUserDTO);
  }

  @Patch('/addFriend/:id')
  addFriend(@Param('id') id: ObjectId, @Body() friendId: FriendDTO) {
    return this.userService.addFriend(id, friendId.friendId);
  }

  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.userService.delete(id);
  }
}
