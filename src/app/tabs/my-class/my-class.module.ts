import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MyClassPageRoutingModule } from './my-class-routing.module';

import { MyClassPage } from './my-class.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyClassPageRoutingModule
  ],
  declarations: [MyClassPage]
})
export class MyClassPageModule {}
