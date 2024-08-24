import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FriendDTO, UpdateUserDTO } from './user.dto';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/getOneById/:id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', description: 'User ID', type: String })
  async getOneById(@Param('id') id: ObjectId) {
    return await this.userService.getOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/searchByTag/')
  @ApiOperation({ summary: 'Search users by tag' })
  @ApiQuery({ name: 'query', description: 'Tag to search for', type: String })
  async searchByTag(@Query('query') query: string) {
    return await this.userService.searchByTag(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/getFriends/:id')
  @ApiOperation({ summary: 'Get friends of a user by ID' })
  @ApiParam({ name: 'id', description: 'User ID', type: String })
  async getFriendsById(@Param('id') id: ObjectId) {
    return await this.userService.getFriendsById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiParam({ name: 'id', description: 'User ID', type: String })
  @ApiBody({ type: UpdateUserDTO })
  async update(
    @Param('id') id: ObjectId,
    @Body() updateUserDTO: UpdateUserDTO,
  ) {
    return await this.userService.update(id, updateUserDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/addFriend/:id')
  @ApiOperation({ summary: 'Add a friend to a user' })
  @ApiParam({ name: 'id', description: 'User ID', type: String })
  @ApiBody({ type: FriendDTO })
  async addFriend(@Param('id') id: ObjectId, @Body() friendDTO: FriendDTO) {
    return await this.userService.addFriend(id, friendDTO.friendId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/removeFriend/:id')
  @ApiOperation({ summary: 'Remove a friend from a user' })
  @ApiParam({ name: 'id', description: 'User ID', type: String })
  @ApiBody({ type: FriendDTO })
  async removeFriend(@Param('id') id: ObjectId, @Body() friendDTO: FriendDTO) {
    return await this.userService.removeFriend(id, friendDTO.friendId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({ name: 'id', description: 'User ID', type: String })
  async delete(@Param('id') id: ObjectId) {
    return await this.userService.delete(id);
  }
}
