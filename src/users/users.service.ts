import { Injectable } from '@nestjs/common';

// mock entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
      role: 'admin',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
      role: 'staff',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((u) => u.username === username);
  }
}
