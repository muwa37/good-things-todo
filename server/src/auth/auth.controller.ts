import { Body, Controller, Post } from '@nestjs/common';
import { UserDTO } from 'src/user/user.dto';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/login')
  async login(@Body() userDTO: UserDTO) {
    return await this.authService.login(userDTO);
  }

  @Post('/registration')
  async registration(@Body() userDTO: UserDTO) {
    return await this.authService.registration(userDTO);
  }
}
