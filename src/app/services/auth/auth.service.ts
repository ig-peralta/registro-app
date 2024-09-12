import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { SessionService } from '../session/session.service';
import { UserData } from 'src/app/_utils/interfaces/user-data.interface';
import { User } from 'src/app/_utils/interfaces/user.interface';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(
    private readonly user: UserService,
    private readonly session: SessionService,
    private readonly storage: LocalStorageService
  ) {}


  login(username: string, password: string): boolean {
    const user = this.user.getByUsername(username) as Partial<User>;
    if (!user)
      return false;
    if (user.password !== password)
      return false;
    this.session.user = user as UserData;
    this.storage.setItem('user', user as UserData);
    return true;
  }

  logout() {
    this.session.user = null;
    this.storage.removeItem('user');
  }

  recoverPassword(email: string, answer: string): string | null {
    const user = this.user.getByEmail(email) as User;
    if (!user)
      return null;
    if (user.securityAnswer !== answer)
      return null;
    return user.password;
  }

  getSecurityQuestion(email: string): string | null {
    const user = this.user.getByEmail(email) as User;
    if (!user)
      return null;
    return user.securityQuestion;
  }

}
