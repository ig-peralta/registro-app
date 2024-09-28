import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MyProfilePageRoutingModule } from './my-profile-routing.module';
import { MyProfilePage } from './my-profile.page';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyProfilePageRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule
  ],
  declarations: [MyProfilePage],
  providers: [provideNativeDateAdapter()],
})
export class MyProfilePageModule {}
