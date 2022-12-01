import { IsNotEmpty, Matches, MinLength, NotContains } from 'class-validator';
import { User } from 'src/users/user.entity';

export class CreateUserDto implements Pick<User, 'username' | 'password'> {
  @IsNotEmpty({ message: 'Pick a username', groups: ['reg'] })
  @MinLength(3, { message: 'At least 3 characters' })
  @Matches(/^[a-zA-Z0-9]+$/, { message: 'Only letters and numbers' })
  username: string;

  @IsNotEmpty({ message: 'Pick a password' })
  @MinLength(3, { message: 'At least 3 characters' })
  @NotContains(' ', { message: "Password can't contain spaces" })
  password: string;
}
