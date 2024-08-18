import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserDTO } from 'src/user/user.dto';
import { User } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(userDTO: UserDTO): Promise<{
    token: string;
  }> {
    const user = await this.validateUser(userDTO);
    return this.generateToken(user);
  }

  async registration(userDTO: UserDTO): Promise<{
    token: string;
  }> {
    const candidate = await this.userService.getOneByTag(userDTO.tag);
    if (candidate) {
      throw new HttpException(
        'user with this tag already exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(userDTO.password, 5);
    const user = await this.userService.create({
      ...userDTO,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  async generateToken(user: User): Promise<{
    token: string;
  }> {
    const payload = { name: user.name, tag: user.tag };
    return { token: this.jwtService.sign(payload) };
  }

  async validateUser(userDto: UserDTO): Promise<User> {
    const user = await this.userService.getOneByTag(userDto.tag);
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(
        userDto.password,
        user?.password,
      );
      if (isPasswordCorrect) return user;
    }

    throw new UnauthorizedException({
      message: 'tag or password is not correct',
    });
  }
}
