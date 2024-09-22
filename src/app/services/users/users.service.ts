import { Injectable } from '@angular/core';
import { EducationLevel } from 'src/app/_utils/enums/education-level.enum';
import { usersDb } from 'src/app/_utils/users.database';
import { User } from 'src/app/models/user.model';

@Injectable({providedIn: 'root'})
export class UsersService {
  users: User[] = usersDb;

  create(user: User): void {
    this.users.push(user);
  }

  getAll(): User[] {
    return this.users;
  }

  getById(id: number): User | null {
    const user = this.users.find(user => user.id === id);
    if (!user) return null;
    return user;
  }

  getByEmail(email: string): User | null {
    const user = this.users.find(user => user.email === email);
    if (!user) return null;
    return user;
  }

  getByUsername(username: string): User | null {
    const user = this.users.find(user => user.username === username);
    if (!user) return null;
    return user;
  }

  updateUser(id: number, data: Partial<User>): User | null {
    const user = this.users.find(user => user.id === id);
    if (!user) return null;
    for (const key in data) {
      // HACK wtf??
      (user as any)[key as keyof User] = data[key as keyof User]!
    }
    return user
  }
}
