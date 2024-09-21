import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WrongPassPageRoutingModule } from './wrong-pass-routing.module';

import { WrongPassPage } from './wrong-pass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WrongPassPageRoutingModule
  ],
  declarations: [WrongPassPage]
})
export class WrongPassPageModule {}
