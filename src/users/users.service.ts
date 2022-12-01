import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersService: Repository<User>) {}

  async create(username: string, password: string) {
    const user = new User();
    user.username = username;
    user.password = await hash(password, 10);

    return this.usersService.save(user);
  }

  findOneByUsername(username: string) {
    return this.usersService.findOneBy({ username });
  }
}
