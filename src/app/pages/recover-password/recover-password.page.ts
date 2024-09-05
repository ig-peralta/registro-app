import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
})
export class RecoverPasswordPage {

  email: string = '';
  answer: string = '';
  securityQuestion: string = '';
  submitted: boolean = false;
  password: string = '';

  constructor(private readonly auth: AuthService) {}

  getQuestion() {
    console.log()
    this.securityQuestion = this.auth.getSecurityQuestion(this.email) || '';
    if (this.securityQuestion) {
      this.submitted = true;
    }
  }

  recover() {
    const password = this.auth.recoverPassword(this.email, this.answer);
    if (password)
      this.password = password;
  }


}
