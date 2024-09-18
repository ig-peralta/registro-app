import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyClassPage } from './my-class.page';

const routes: Routes = [
  {
    path: '',
    component: MyClassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyClassPageRoutingModule {}
