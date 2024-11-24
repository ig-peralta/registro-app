import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { adminGuard } from 'src/app/guards/admin/admin.guard';
import { noAdminGuard } from 'src/app/guards/no-admin/no-admin.guard';
import { authGuard } from 'src/app/guards/auth/auth.guard';


export const routes: Routes = [
    {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./home/home.page').then((m) => m.HomePage),
          canActivate: [noAdminGuard]
      },
      {
        path: 'my-class',
        loadComponent: () =>
          import('./my-class/my-class.page').then((m) => m.MyClassPage),
          canActivate: [noAdminGuard]
      },
      {
        path: 'my-profile',
        loadComponent: () =>
          import('./my-profile/my-profile.page').then((m) => m.MyProfilePage),
          canActivate: [authGuard]
      },
      {
        path: 'forum',
        loadComponent: () => import('./forum/forum.page').then( m => m.ForumPage),
          canActivate: [authGuard]
      },{
    path: 'users',
    loadComponent: () => import('./users/users.page').then( m => m.UsersPage),
      canActivate: [adminGuard]
  },

    ],
  },


];
