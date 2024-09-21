import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  logout() {
    this.auth.logout();
  }

  goHome() {
    this.router.navigateByUrl('tabs/home');
  }

  goMyClass() {
    this.router.navigateByUrl('tabs/my-class');
  }

  goMyProfile() {
    this.router.navigateByUrl('tabs/my-profile');
  }
}
