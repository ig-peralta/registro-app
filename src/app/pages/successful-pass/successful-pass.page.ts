import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { addIcons } from "ionicons";
import { logoTwitter, logoInstagram, logoLinkedin } from "ionicons/icons";
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonButton, IonFooter, IonIcon, IonButtons, IonBackButton } from "@ionic/angular/standalone";
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';


@Component({
    selector: 'app-successful-pass',
    standalone: true,
    templateUrl: './successful-pass.page.html',
    styleUrls: ['./successful-pass.page.scss'],
    imports: [
        IonHeader, IonToolbar, IonTitle,
        IonContent, IonCard, IonButton,
        IonFooter, IonIcon, TranslateModule,
        IonButtons, IonBackButton
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

    constructor(private translate: TranslateService) {
        addIcons({ logoTwitter, logoInstagram, logoLinkedin });
        const lang = localStorage.getItem('lang') || 'es';
        this.translate.use(lang);
    }
}
