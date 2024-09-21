import { Injectable, inject } from '@angular/core';
import { SessionService } from '../session/session.service';
import { Router } from '@angular/router';
import { UsersService } from '../users/users.service';
import { NavigationService } from '../navigation/navigation.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly users = inject(UsersService);
  private readonly session = inject(SessionService);
  private readonly router = inject(Router);
  private readonly nav = inject(NavigationService);

  // had to make it like this because they are forcing us to use state, BIG SAD
  login(username: string, password: string): string | null {
    const user = this.users.getByUsername(username);
    // you can separate this statements into two if you want to tell the user that the username is incorrect
    if (!user || user.password !== password)
      return 'Usuario o contraseña incorrectos';
    this.session.user = user;
    this.nav.redirectWithData('tabs/home', { user });
    return null
  }

  logout() {
    this.session.user = null;
    this.router.navigateByUrl('login');
  }

  recoverPassword(email: string, answer: string): string | null {
    const user = this.users.getByEmail(email);
    if (!user || user.securityAnswer !== answer)
      return null;
    return user.password;
  }

  getSecurityQuestion(email: string): string | null {
    const user = this.users.getByEmail(email);
    if (!user)
      return null;
    return user.securityQuestion;
  }

}
