import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
})
export class RecoverPasswordPage {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly nav = inject(NavigationService);
  private readonly toasts = inject(ToastController);

  securityQuestion: string = '';
  submitted: boolean = false;
  password: string = '';
  emailForm = new FormGroup({
    email: new FormControl('', Validators.email)
  });
  answerForm = new FormGroup({
    answer: new FormControl('', Validators.required)
  });

  get email() {
    return this.emailForm.get('email')?.value;
  }

  get emailError() {
    return this.emailForm.get('email')?.hasError('email');
  }

  get answer() {
    return this.answerForm.get('answer')?.value;
  }

  get answerError() {
    return this.answerForm.get('answer')?.hasError('required');
  }

  getQuestion(): void {
    if (!this.email) return;
    this.securityQuestion = this.auth.getSecurityQuestion(this.email) || '';
    if (this.securityQuestion) {
      this.submitted = true;
    } else {
      this.toasts.create({
        message: 'Correo no registrado',
        duration: 2000
      }).then(toast => toast.present());
      this.router.navigateByUrl('/wrong-pass');
    }
  }

  recover(): void {
    if (!this.email || !this.answer) return;
    const password = this.auth.recoverPassword(this.email, this.answer);
    if (password)
      this.nav.redirectWithData('successful-pass', { password });
    else
      this.router.navigateByUrl('/wrong-pass');
  }
}
