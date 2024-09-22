import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  auth = inject(AuthService);
  nav = inject(NavigationService);
  toasts = inject(ToastController);
  router = inject(Router);

  userId: number = 0;
  changePasswordForm = new FormGroup({
    oldPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  });

  ngOnInit() {
    this.userId = this.nav.getState().userId;
    console.log(this.userId);
  }

  get oldPassword() {
    return this.changePasswordForm.get('oldPassword')?.value;
  }

  get newPassword() {
    return this.changePasswordForm.get('newPassword')?.value;
  }

  get confirmPassword() {
    return this.changePasswordForm.get('confirmPassword')?.value;
  }

  get oldPasswordError() {
    return this.changePasswordForm.get('oldPassword')?.hasError('required');
  }

  get newPasswordError() {
    return this.changePasswordForm.get('newPassword')?.hasError('required');
  }

  get confirmPasswordError() {
    return this.changePasswordForm.get('confirmPassword')?.hasError('required');
  }

  changePassword(): void {
    if (!this.oldPassword || !this.newPassword) return;
    if (this.newPassword !== this.confirmPassword) {
      this.toasts.create({
        message: 'Contraseñas no coinciden',
        duration: 2000
      }).then(toast => toast.present());
      return;
    }
    const error = this.auth.changePassword({
      userId: this.userId,
      oldPassword: this.oldPassword,
      newPassword:  this.newPassword,
    });
    if (error) {
      this.toasts.create({
        message: error,
        duration: 2000
      }).then(toast => toast.present());
    } else {
      this.router.navigateByUrl('/tabs/home');
    }
  }
}
