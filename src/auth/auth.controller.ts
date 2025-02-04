import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // to test this:
  // curl -X POST http://localhost:3000/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  /* TEST route
    curl http://localhost:3000/auth/profile
    curl -X POST http://localhost:3000/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"
    curl http://localhost:3000/auth/profile -H "Authorization: Bearer USER_PREVIOUS_TOKEN_GET_BY_API_ABOVE"
  */
  // UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req?.user;
  }
}
