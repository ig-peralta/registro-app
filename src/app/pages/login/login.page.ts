import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Navigation, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('0.5s ease-out', style({ opacity: 0 }))
      ])
    ]),
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('0.5s ease-out', style({ transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('0.5s ease-in', style({ transform: 'translateY(-100%)' }))
      ])
    ]),
    trigger('pulseAnimation', [
      state('pulse', style({ transform: 'scale(1.05)' })),
      transition('* => pulse', [
        animate('0.3s ease-in-out', style({ transform: 'scale(1.05)' })),
        animate('0.3s ease-in-out', style({ transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class LoginPage {
  auth = inject(AuthService);
  router = inject(Router);
  toasts = inject(ToastController);
  pulseState: string = '';
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
  resetPulse() {
    this.pulseState = '';
  }
}
