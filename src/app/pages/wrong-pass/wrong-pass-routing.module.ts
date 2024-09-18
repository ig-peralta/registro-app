import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WrongPassPage } from './wrong-pass.page';

const routes: Routes = [
  {
    path: '',
    component: WrongPassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WrongPassPageRoutingModule {}
