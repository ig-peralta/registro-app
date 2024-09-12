import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { SessionService } from '../session/session.service';
import { User } from 'src/app/_utils/interfaces/user.interface';


@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(
    private readonly user: UserService,
    private readonly session: SessionService,
  ) {}


  login(username: string, password: string): boolean {
    const user = this.user.getByUsername(username) as any; //TODO: Change any to User Entity
    if (!user)
      return false;
    if (user.password !== password)
      return false;
    delete user.password;
    delete user.securityAnswer;
    this.session.user = user as User;
    return true;
  }

  logout() {
    this.session.user = null;
  }

  recoverPassword(email: string, answer: string): string | null {
    const user = this.user.getByEmail(email) as any; //TODO: Change any to User Entity
    if (!user)
      return null;
    if (user.securityAnswer !== answer)
      return null;
    return user.password;
  }

  getSecurityQuestion(email: string): string | null {
    const user = this.user.getByEmail(email) as any; //TODO: Change any to User Entity
    if (!user)
      return null;
    return user.securityQuestion;
  }

}

