import { Component, OnInit } from '@angular/core';
import { addIcons } from "ionicons";
import { logoTwitter, logoInstagram, logoLinkedin } from "ionicons/icons";
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonCard, IonText, IonFooter, IonIcon } from "@ionic/angular/standalone";

@Component({
    selector: 'app-wrong-pass',
    templateUrl: './wrong-pass.page.html',
    styleUrls: ['./wrong-pass.page.scss'],
    standalone: true,
    imports: [
        IonHeader, IonToolbar, IonButtons,
        IonBackButton, IonTitle, IonContent,
        IonCard, IonText, IonFooter, IonIcon
    ]
})
export class WrongPassPage implements OnInit {

    constructor() {
        addIcons({ logoTwitter, logoInstagram, logoLinkedin });
    }

    ngOnInit() {
    }

}
