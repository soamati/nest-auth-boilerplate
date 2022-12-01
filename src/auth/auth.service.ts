import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(username: string, password: string) {
    const user = await this.usersService.create(username, password);
    return { accessToken: this.createToken(user) };
  }

  login(user: User) {
    return { accessToken: this.createToken(user) };
  }

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOneByUsername(username);
    if (!user) return null;

    const isMatch = await compare(password, user.password);
    if (!isMatch) return null;

    const { password: _, ...result } = user;
    return result;
  }

  createToken({ username, id }: User) {
    const payload = { username, sub: id };
    return this.jwtService.sign(payload);
  }
}
