import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from 'src/app/services/session/session.service';

export const noAdminGuard: CanActivateFn = () => {
  const session = inject(SessionService);
  const router = inject(Router);
  const currentUser = session.userSnapshot;
  if (!currentUser) {
    router.navigateByUrl('/login');
    return false;
  } else if (currentUser.isAdmin === 1) {
    router.navigateByUrl('/tabs/users');
    return false;
  }
  return true;
};
