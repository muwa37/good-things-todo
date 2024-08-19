import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FriendDTO, UpdateUserDTO, UserDTO } from './user.dto';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() createUserDTO: UserDTO) {
    return this.userService.create(createUserDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/getOneById/:id')
  async getOneById(@Param('id') id: ObjectId) {
    return await this.userService.getOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/searchByTag/')
  async searchByTag(@Query('query') query: string) {
    return await this.userService.searchByTag(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/getFriends/:id')
  async getFriendsById(@Param('id') id: ObjectId) {
    return await this.userService.getFriendsById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: ObjectId,
    @Body() updateUserDTO: UpdateUserDTO,
  ) {
    return await this.userService.update(id, updateUserDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/addFriend/:id')
  async addFriend(@Param('id') id: ObjectId, @Body() friendDTO: FriendDTO) {
    return await this.userService.addFriend(id, friendDTO.friendId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: ObjectId) {
    return await this.userService.delete(id);
  }
}
