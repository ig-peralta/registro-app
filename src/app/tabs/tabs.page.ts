import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ScannerService } from '../services/scanner/scanner.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly scannerState = inject(ScannerService);

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('tabs/home');
  }

  goHome() {
    this.scannerState.scanning = true
    this.router.navigateByUrl('tabs/home');
  }

  goMyClass() {
    this.router.navigateByUrl('tabs/my-class');
  }

  goMyProfile() {
    this.router.navigateByUrl('tabs/my-profile');
  }
}
