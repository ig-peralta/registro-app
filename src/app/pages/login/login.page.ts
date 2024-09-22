import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Navigation, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  auth = inject(AuthService);
  router = inject(Router);
  toasts = inject(ToastController);

  nav: Navigation | null = this.router.getCurrentNavigation();
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  get username() {
    return this.loginForm.get('username')?.value;
  }

  get password() {
    return this.loginForm.get('password')?.value;
  }

  get usernameError() {
    return this.loginForm.get('username')?.hasError('required');
  }

  get passwordError() {
    return this.loginForm.get('password')?.hasError('required');
  }

  login(): void {
    if (!this.username || !this.password) return;
    const error = this.auth.login(this.username, this.password);
    if (error) {
      this.toasts.create({
        message: error,
        duration: 2000
      }).then(toast => toast.present());
    }
    // redirect occurs in the service because I don't want to bring the user data here :P
  }

  goToRecoverPassword(): void{
    this.router.navigateByUrl('/recover-password')
  }
}
