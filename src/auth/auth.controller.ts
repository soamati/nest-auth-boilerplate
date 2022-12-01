import { Body, Controller, Post, UseGuards, Req, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from 'src/users/user.entity';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  register(@Body() { username, password }: CreateUserDto) {
    return this.authService.register(username, password);
  }

  @UseGuards(AuthGuard('local'))
  @Post('/signin')
  login(@Req() req: Request) {
    return this.authService.login(req.user as User);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  me(@Req() req: Request) {
    return req.user;
  }
}
