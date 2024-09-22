import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SessionService } from 'src/app/services/session/session.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { ScannerService } from 'src/app/services/scanner/scanner.service';


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
  session = inject(SessionService);
  auth = inject(AuthService);
  router = inject(Router);
  nav = inject(NavigationService);
  scanner = inject(ScannerService);

  name: string = '';
  lastname: string = '';
  scannerLoading: boolean = true

  ngOnInit() {
    this.session.user.subscribe((user: User | null) => {
      this.name = user?.name || '';
      this.lastname = user?.lastname || '';
    })
    this.scanner.loading.subscribe(state => this.scannerLoading = state);
    // this.getStateData();
  }

  // we did this to prove that we can get the data from the state
  getStateData() {
    const user = this.nav.getState()['user'];
    const name = user?.name || '';
    const lastname = user?.lastname || '';
    console.log('data from state', name, lastname);
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
