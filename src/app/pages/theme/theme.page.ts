import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonFooter, IonIcon, IonSelect, IonItem, IonSelectOption, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonLabel, IonDatetime, IonInput, IonTextarea, IonToggle, IonCheckbox } from '@ionic/angular/standalone';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { logoTwitter, logoInstagram, logoLinkedin } from "ionicons/icons";
import { addIcons } from 'ionicons';
import { ThemeService } from 'src/app/services/theme.service';


@Component({
  selector: 'app-theme',
  templateUrl: './theme.page.html',
  styleUrls: ['./theme.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle,
            IonToolbar, CommonModule, FormsModule, 
            IonButtons, IonBackButton, TranslateModule, 
            IonFooter, IonIcon, IonSelect, IonItem,
            IonSelectOption, IonButton, IonCard, 
            IonCardHeader, IonCardTitle, IonCardSubtitle, 
            IonCardContent, IonList, IonLabel, IonDatetime,
            IonInput, IonTextarea, IonToggle, IonCheckbox ]
})
export class ThemePage implements OnInit {

  constructor(private translate: TranslateService, private themeService: ThemeService) {
    addIcons({ logoTwitter, logoInstagram, logoLinkedin });
    const lang = localStorage.getItem('lang') || 'es';
    this.translate.use(lang);
  }

  ngOnInit() {
  }
  changeTheme(event: any) {
    this.themeService.setTheme(event.detail.value);
  }
}
