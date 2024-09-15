import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionService } from 'src/app/services/session/session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private session: SessionService,
    private router: Router,
  ) {}

  canActivate() {
    const user = this.session.status();
    if (user)
      return true
    this.router.navigateByUrl('/login')
    return false
  }
}


