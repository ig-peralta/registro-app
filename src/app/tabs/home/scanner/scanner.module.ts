import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScannerComponent } from './scanner.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    ScannerComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ScannerComponent
  ]
})
export class ScannerModule { }
