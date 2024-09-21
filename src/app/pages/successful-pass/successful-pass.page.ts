import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-successful-pass',
  templateUrl: './successful-pass.page.html',
  styleUrls: ['./successful-pass.page.scss'],
})
export class SuccessfulPassPage implements OnInit {
  router = inject(Router);
  nav = inject(NavigationService);

  password: string = '';

  ngOnInit() {
    this.password = this.nav.getState()['password'];
  }

  goToLogin(): void {
    this.router.navigateByUrl('/login');
  }
}
