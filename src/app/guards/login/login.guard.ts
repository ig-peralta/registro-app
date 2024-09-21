import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { take } from 'rxjs';
import { SessionService } from 'src/app/services/session/session.service';

export const loginGuard: CanActivateFn = () => {
  const session = inject(SessionService);
  const router = inject(Router);

  let currentUser;
  session.user.pipe(take(1)).subscribe(user => {
    currentUser = user;
  });
  if (currentUser) {
    router.navigateByUrl('tabs/home');
    return false;
  }
  return true;
};
