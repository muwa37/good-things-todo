import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO, RegistrationDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDTO: LoginDTO) {
    return await this.authService.login(loginDTO);
  }

  @Post('/registration')
  async registration(@Body() registrationDTO: RegistrationDTO) {
    return await this.authService.registration(registrationDTO);
  }
}
