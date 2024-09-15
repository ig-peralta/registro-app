import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from 'src/app/_utils/interfaces/user-data.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  name: string = '';
  surname: string = '';
  constructor(
    private readonly session: SessionService,
    private readonly router: Router,
    private readonly auth: AuthService
  ) { }

  ngOnInit() {
    this.session.user.subscribe((user: UserData | null) => {
      this.name = user?.name || '';
      this.surname = user?.surname || '';

    })
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
