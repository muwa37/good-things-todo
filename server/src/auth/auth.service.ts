import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { LoginDTO, RegistrationDTO } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDTO: LoginDTO): Promise<{
    token: string;
  }> {
    const user = await this.validateUser(loginDTO);
    return this.generateToken(user);
  }

  async registration(registrationDTO: RegistrationDTO): Promise<{
    token: string;
  }> {
    const candidate = await this.userService.getOneByTag(registrationDTO.tag);
    if (candidate) {
      throw new HttpException(
        'user with this tag already exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(registrationDTO.password, 5);
    const user = await this.userService.create({
      ...registrationDTO,
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

  async validateUser(loginDTO: LoginDTO): Promise<User> {
    const user = await this.userService.getOneByTag(loginDTO.tag);
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(
        loginDTO.password,
        user?.password,
      );
      if (isPasswordCorrect) return user;
    }

    throw new UnauthorizedException({
      message: 'tag or password is not correct',
    });
  }
}
