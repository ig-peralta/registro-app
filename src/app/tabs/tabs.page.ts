import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage  implements OnInit {
  flags = {
    home: false,
    myClass: false,
    myProfile: false
  }

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    const url = this.router.url;
    if (url == '/home') this.flags.home = true;
    if (url == '/my-class') this.flags.myClass = true;
    if (url == '/my-profile') this.flags.myProfile = true;
  }

  logout() {
    this.auth.logout();
  }

  goHome() {
    this.router.navigateByUrl('/home');
  }

  goMyClass() {
    this.router.navigateByUrl('/my-class');
  }

  goMyProfile() {
    this.router.navigateByUrl('/my-profile');
  }
}
