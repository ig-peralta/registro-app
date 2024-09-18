import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuccessfulPassPageRoutingModule } from './successful-pass-routing.module';

import { SuccessfulPassPage } from './successful-pass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuccessfulPassPageRoutingModule
  ],
  declarations: [SuccessfulPassPage]
})
export class SuccessfulPassPageModule {}
