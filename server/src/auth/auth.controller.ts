import { Body, Controller, Post } from '@nestjs/common';
import { UserDTO } from 'src/user/user.dto';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/login')
  login(@Body() userDTO: UserDTO) {
    return this.authService.login(userDTO);
  }

  @Post('/registration')
  registration(@Body() userDTO: UserDTO) {
    this.authService.registration(userDTO);
  }
}
