import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = '';
  password: string = '';

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit() {
  }

  login() {
    if (this.auth.login(this.username, this.password)) {
      console.log('Login successful');
      this.router.navigateByUrl('/my-profile');
    } else {
      console.log('Login failed');
    }
  }

}
