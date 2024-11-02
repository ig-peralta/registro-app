import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonButton, IonFooter, IonIcon } from '@ionic/angular/standalone';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { logoTwitter, logoInstagram, logoLinkedin } from "ionicons/icons";

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton,  IonButtons, IonButton, TranslateModule, IonFooter, IonIcon ]
})
export class MapPage implements OnInit {

  constructor(private translate: TranslateService) {
    addIcons({ logoTwitter, logoInstagram, logoLinkedin });
    const lang = localStorage.getItem('lang') || 'es';
    this.translate.use(lang);
}

  ngOnInit() {
  }

}
