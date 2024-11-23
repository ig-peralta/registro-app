import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonFooter, IonIcon, IonCard, IonList, IonInput, IonSelectOption, IonSelect, IonInputPasswordToggle, IonButton } from '@ionic/angular/standalone';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from "ionicons";
import { logoTwitter, logoInstagram, logoLinkedin } from "ionicons/icons";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EducationLevel } from 'src/app/_utils/enums/education-level.enum';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, 
    IonToolbar, CommonModule, FormsModule, 
    IonButtons, IonBackButton, TranslateModule,
     IonFooter, IonIcon, IonCard, IonList, 
     IonInput, IonSelectOption, MatInputModule, 
     MatDatepickerModule, MatFormFieldModule, IonSelect, 
     MatNativeDateModule, IonInputPasswordToggle, IonButton ],
     providers: [MatDatepickerModule],
})
export class RegisterPage implements OnInit {
  educationLevels = Object.values(EducationLevel).slice(0, 6);
  educationLevel: string = '';
  constructor(private translate: TranslateService) {
    addIcons({ logoTwitter, logoInstagram, logoLinkedin });
    const lang = localStorage.getItem('lang') || 'es';
    this.translate.use(lang);
}

  ngOnInit() {
  }

}
