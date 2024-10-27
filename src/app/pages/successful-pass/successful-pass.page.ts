import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { addIcons } from "ionicons";
import { logoTwitter, logoInstagram, logoLinkedin } from "ionicons/icons";
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonButton, IonFooter, IonIcon } from "@ionic/angular/standalone";

@Component({
    selector: 'app-successful-pass',
    standalone: true,
    templateUrl: './successful-pass.page.html',
    styleUrls: ['./successful-pass.page.scss'],
    imports: [
        IonHeader, IonToolbar, IonTitle,
        IonContent, IonCard, IonButton,
        IonFooter, IonIcon
    ]
})
export class SuccessfulPassPage implements OnInit {
    router = inject(Router);
    nav = inject(NavigationService);

    password: string = '';

    ngOnInit() {
        this.password = this.nav.getState()['password'];
    }

    goToLogin(): void {
        this.router.navigateByUrl('/login');
    }

    constructor() {
        addIcons({ logoTwitter, logoInstagram, logoLinkedin });
    }
}
