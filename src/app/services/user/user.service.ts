import { Injectable } from '@angular/core';
import { usersDb } from './user.database';
import { User } from 'src/app/_utils/interfaces/user.interface';


@Injectable({providedIn: 'root'})
export class UserService {

  users: User[] = usersDb;

  constructor() {}

  create(user: User): void {
    this.users.push(user);
  }
 
  getByEmail(email: string): User | null {
    const user = this.users.find(user => user.email === email);
    if (!user)
      return null;
    return user;
  }

  getByUsername(username: string): User | null {
    const user = this.users.find(user => user.username === username);
    if (!user)
      return null;
    return user;
  }
}
