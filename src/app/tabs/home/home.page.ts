import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from 'src/app/_utils/interfaces/user-data.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SessionService } from 'src/app/services/session/session.service';
import { trigger, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-in', style({ opacity: 1 }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('0.8s ease-out', style({ transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fadeInTitle', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s 0.5s ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})

export class HomePage implements OnInit {
  name: string = '';
  surname: string = '';
  constructor(
    private readonly session: SessionService,
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
  }
}
