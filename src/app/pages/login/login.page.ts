import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Navigation, Router } from '@angular/router';
import { IonInputPasswordToggle, ToastController } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth/auth.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { addIcons } from "ionicons";
import { logoTwitter, logoInstagram, logoLinkedin, globe, colorPalette, chevronUpCircle } from "ionicons/icons";
import { IonHeader, IonModal, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonInput, IonButton, IonFooter, IonIcon, IonFabButton, IonFab, IonFabList,IonList, IonItem, IonLabel } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    standalone: true,
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('0.5s ease-in', style({ opacity: 1 }))
            ]),
            transition(':leave', [
                animate('0.5s ease-out', style({ opacity: 0 }))
            ])
        ]),
        trigger('slideInOut', [
            transition(':enter', [
                style({ transform: 'translateY(-100%)' }),
                animate('0.5s ease-out', style({ transform: 'translateY(0)' }))
            ]),
            transition(':leave', [
                animate('0.5s ease-in', style({ transform: 'translateY(-100%)' }))
            ])
        ]),
        trigger('pulseAnimation', [
            state('pulse', style({ transform: 'scale(1.05)' })),
            transition('* => pulse', [
                animate('0.3s ease-in-out', style({ transform: 'scale(1.05)' })),
                animate('0.3s ease-in-out', style({ transform: 'scale(1)' }))
            ])
        ])
    ],
    imports: [
      IonHeader, IonToolbar, IonTitle,
      IonContent, IonCard, IonCardHeader,
      IonCardTitle, IonCardContent, IonInput,
      IonButton, IonFooter, IonIcon,
      ReactiveFormsModule, CommonModule, IonInputPasswordToggle,
      IonFabButton, IonFab, IonFabList, IonModal, IonList, IonItem,
      IonLabel, TranslateModule
    ]
})
export class LoginPage {
    auth = inject(AuthService);
    router = inject(Router);
    toasts = inject(ToastController);
    pulseState: string = '';
    nav: Navigation | null = this.router.getCurrentNavigation();
    loginForm = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    });

    get username() {
        return this.loginForm.get('username')?.value;
    }

    get password() {
        return this.loginForm.get('password')?.value;
    }

    get usernameError() {
        return this.loginForm.get('username')?.hasError('required');
    }

    get passwordError() {
        return this.loginForm.get('password')?.hasError('required');
    }

    async login(): Promise<void> {
        if (!this.username || !this.password) return;
        const error = await this.auth.login(this.username, this.password);
        if (error) {
            this.toasts.create({
                message: error,
                duration: 2000
            }).then(toast => toast.present());
        }
    }

    goToRecoverPassword(): void {
        this.router.navigateByUrl('/recover-password')
    }
    resetPulse() {
        this.pulseState = '';
    }

    constructor(private translate: TranslateService) { // Removido TranslationService
        addIcons({ logoTwitter, logoInstagram, logoLinkedin, colorPalette, globe, chevronUpCircle });
        this.translate.setDefaultLang('es');
        const lang = localStorage.getItem('lang') || 'es';
        this.translate.use(lang);
    }

    changeLanguage(lang: string) {
        this.translate.use(lang);
        localStorage.setItem('lang', lang); // Guarda el idioma preferido
    }
}
