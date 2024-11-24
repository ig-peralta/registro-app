import { Injectable, inject } from '@angular/core';
import { SessionService } from '../session/session.service';
import { UsersService } from '../users/users.service';
import { ChangePasswordDto } from 'src/app/_utils/dto/change-password.dto';
import { User } from 'src/app/_utils/interfaces/user.interface';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly users = inject(UsersService);
  private readonly session = inject(SessionService);
  private readonly router = inject(Router)

  async login(username: string, password: string): Promise<string | null> {
    const user = await this.users.findOne(username);
    // you can separate this statements into two if you want to tell the user that the username is incorrect
    if (!user || user.password !== password)
      return 'Usuario o contraseña incorrectos';
    this.session.user = user;
    if (user.isAdmin === 1) {
      this.router.navigateByUrl('tabs/users');
      return null;
    } else {
      this.router.navigateByUrl('tabs/home');
      return null
    }
  }

  logout() {
    this.session.user = null;
  }

  async register(payload: User): Promise<string | null> {
    const users = await this.users.findAll();
    const payloadEmail = payload.email;
    const payloadUsername = payload.username;
    if (users.some(user => user.email === payloadEmail))
      return 'Correo ya registrado';
    if (users.some(user => user.username === payloadUsername))
      return 'Usuario ya registrado';
    const user = await this.users.create(payload);
    this.session.user = user;
    return null;
  }

  async recoverPassword(email: string, answer: string): Promise<string | null> {
    const user = await this.users.findOneByEmail(email);
    if (!user || user.securityAnswer !== answer)
      return null;
    return user.password;
  }

  async getSecurityQuestion(email: string): Promise<string | null> {
    const user = await this.users.findOneByEmail(email);
    if (!user)
      return null;
    return user.securityQuestion;
  }

  async changePassword(dto : ChangePasswordDto): Promise<string | null> {
    const user = await this.users.findOne(dto.username);
    if (!user) // just in case, this would not happen in a normal user flow
      return 'Usuario no encontrado';
    if (user.password !== dto.oldPassword)
      return 'Contraseña incorrecta'; // this should be the only real way of this failing
    await this.users.changePassword(dto.username, dto.newPassword);
    return null
  }
}
