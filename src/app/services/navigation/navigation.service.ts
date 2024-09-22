import { Injectable, inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  router = inject(Router);

  redirectWithData(url: string, data: any): void {
    const extras: NavigationExtras = {
      state: data
    }
    this.router.navigateByUrl(url, extras);
  }

  getState(): any {
    const nav = this.router.getCurrentNavigation();
    if (nav) {
      return nav.extras.state;
    }
    return null;
  }
}
