import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuccessfulPassPage } from './successful-pass.page';

const routes: Routes = [
  {
    path: '',
    component: SuccessfulPassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuccessfulPassPageRoutingModule {}
