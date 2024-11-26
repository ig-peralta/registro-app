import { Routes } from '@angular/router';
import { loginGuard } from './guards/login/login.guard';
import { authGuard } from './guards/auth/auth.guard';
import { LoginPage } from './pages/login/login.page';
import { WrongPassPage } from './pages/wrong-pass/wrong-pass.page';
import { SuccessfulPassPage } from './pages/successful-pass/successful-pass.page';
import { ChangePasswordPage } from './pages/change-password/change-password.page';
import { RecoverPasswordPage } from './pages/recover-password/recover-password.page';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPage,
    canActivate: [loginGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/tabs/tabs.routes').then(m => m.routes)
  },
  {
    path: 'recover-password',
    component: RecoverPasswordPage,
    canActivate: [loginGuard]
  },
  {
    path: 'change-password',
    component: ChangePasswordPage,
    canActivate: [authGuard]
  },
  {
    path: 'successful-pass',
    component: SuccessfulPassPage,
    canActivate: [loginGuard]
  },
  {
    path: 'wrong-pass',
    component: WrongPassPage,
    canActivate: [loginGuard]
  },  {
    path: 'map',
    loadComponent: () => import('./pages/map/map.page').then( m => m.MapPage)
  },
  {
    path: 'theme',
    loadComponent: () => import('./pages/theme/theme.page').then( m => m.ThemePage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },

];
