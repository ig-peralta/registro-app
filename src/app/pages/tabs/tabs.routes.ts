import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';


export const routes: Routes = [
    {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'my-class',
        loadComponent: () =>
          import('./my-class/my-class.page').then((m) => m.MyClassPage),
      },
      {
        path: 'my-profile',
        loadComponent: () =>
          import('./my-profile/my-profile.page').then((m) => m.MyProfilePage),
      },
      {
        path: 'forum',
        loadComponent: () => import('./forum/forum.page').then( m => m.ForumPage)
      },
    ],
  },  {
    path: 'users',
    loadComponent: () => import('./users/users.page').then( m => m.UsersPage)
  },



];
