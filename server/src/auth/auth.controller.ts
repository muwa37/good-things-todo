import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDTO, RegistrationDTO } from './auth.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginDTO })
  async login(@Body() loginDTO: LoginDTO) {
    return await this.authService.login(loginDTO);
  }

  @Post('/registration')
  @ApiOperation({ summary: 'User registration' })
  @ApiBody({ type: RegistrationDTO })
  async registration(@Body() registrationDTO: RegistrationDTO) {
    return await this.authService.registration(registrationDTO);
  }
}
