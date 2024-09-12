import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/_utils/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

  user: User | null = null;
  name: string = '';
  email: string = '';
  educationLevel: string = '';

  constructor(
    private readonly session: SessionService,
    private readonly router: Router,
    private readonly auth: AuthService
  ) {}

  ngOnInit() {
    this.session.user.subscribe((user: User | null) => {
      this.name = user?.name || '';
      this.email = user?.email || '';
      this.educationLevel = user?.educationLevel || '';
    })
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
