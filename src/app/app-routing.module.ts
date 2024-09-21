import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth/auth.guard';
import { loginGuard } from './guards/login/login.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate: [loginGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'recover-password',
    loadChildren: () => import('./pages/recover-password/recover-password.module').then( m => m.RecoverPasswordPageModule)
  },
  {
    path: 'successful-pass',
    loadChildren: () => import('./pages/successful-pass/successful-pass.module').then( m => m.SuccessfulPassPageModule)
  },
  {
    path: 'wrong-pass',
    loadChildren: () => import('./pages/wrong-pass/wrong-pass.module').then( m => m.WrongPassPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
