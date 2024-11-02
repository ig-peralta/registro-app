import { Component, OnInit } from '@angular/core';
import { addIcons } from "ionicons";
import { logoTwitter, logoInstagram, logoLinkedin } from "ionicons/icons";
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonCard, IonText, IonFooter, IonIcon } from "@ionic/angular/standalone";
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-wrong-pass',
    templateUrl: './wrong-pass.page.html',
    styleUrls: ['./wrong-pass.page.scss'],
    standalone: true,
    imports: [
        IonHeader, IonToolbar, IonButtons,
        IonBackButton, IonTitle, IonContent,
        IonCard, IonText, IonFooter, IonIcon,
        TranslateModule
    ]
})
export class WrongPassPage implements OnInit {

    constructor(private translate: TranslateService) {
        addIcons({ logoTwitter, logoInstagram, logoLinkedin });
        const lang = localStorage.getItem('lang') || 'es';
        this.translate.use(lang);
    }

    ngOnInit() {
    }

}
