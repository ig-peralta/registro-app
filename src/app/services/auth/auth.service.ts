import { Injectable, inject } from '@angular/core';
import { SessionService } from '../session/session.service';
import { UsersService } from '../users/users.service';
import { NavigationService } from '../navigation/navigation.service';
import { ChangePasswordDto } from 'src/app/_utils/dto/change-password.dto';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly users = inject(UsersService);
  private readonly session = inject(SessionService);
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

  changePassword(dto : ChangePasswordDto): string | null {
    const user = this.users.getById(dto.userId);
    if (!user) // just in case, this would not happen in a normal user flow
      return 'Usuario no encontrado';
    if (user.password !== dto.oldPassword)
      return 'Contraseña incorrecta'; // this should be the only real way of this failing
    this.users.updateUser(dto.userId, { password: dto.newPassword });
    return null
  }
}
