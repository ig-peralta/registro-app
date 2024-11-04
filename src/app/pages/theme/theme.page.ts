import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonFooter, IonIcon } from '@ionic/angular/standalone';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { logoTwitter, logoInstagram, logoLinkedin } from "ionicons/icons";
import { addIcons } from 'ionicons';


@Component({
  selector: 'app-theme',
  templateUrl: './theme.page.html',
  styleUrls: ['./theme.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, TranslateModule, IonFooter, IonIcon ]
})
export class ThemePage implements OnInit {
  constructor(private translate: TranslateService) {
    addIcons({ logoTwitter, logoInstagram, logoLinkedin });
    const lang = localStorage.getItem('lang') || 'es';
    this.translate.use(lang);
  }

  ngOnInit() {
  }
}
