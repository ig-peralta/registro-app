import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular/standalone';
import { addIcons } from "ionicons";
import { logoTwitter, logoInstagram, logoLinkedin } from "ionicons/icons";
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonInput, IonButton, IonFooter, IonIcon } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-recover-password',
    templateUrl: './recover-password.page.html',
    standalone: true,
    styleUrls: ['./recover-password.page.scss'],
    imports: [
        IonHeader, IonToolbar, IonButtons,
        IonBackButton, IonTitle, IonContent,
        IonCard, IonCardHeader, IonCardTitle,
        IonCardContent, IonInput, IonButton,
        IonFooter, IonIcon, ReactiveFormsModule,
        CommonModule, TranslateModule
    ]
})
export class RecoverPasswordPage {
    private readonly auth = inject(AuthService);
    private readonly router = inject(Router);
    private readonly nav = inject(NavigationService);
    private readonly toasts = inject(ToastController);

    securityQuestion: string = '';
    submitted: boolean = false;
    password: string = '';
    emailForm = new FormGroup({
        email: new FormControl('', Validators.email)
    });
    answerForm = new FormGroup({
        answer: new FormControl('', Validators.required)
    });

    get email() {
        return this.emailForm.get('email')?.value;
    }

    get emailError() {
        return this.emailForm.get('email')?.hasError('email');
    }

    get answer() {
        return this.answerForm.get('answer')?.value;
    }

    get answerError() {
        return this.answerForm.get('answer')?.hasError('required');
    }

    async getQuestion(): Promise<void> {
        if (!this.email) return;
        this.securityQuestion = await this.auth.getSecurityQuestion(this.email) || '';
        if (this.securityQuestion) {
            this.submitted = true;
        } else {
            this.toasts.create({
                message: 'Correo no registrado',
                duration: 2000
            }).then(toast => toast.present());
            this.router.navigateByUrl('/wrong-pass');
        }
    }

    async recover(): Promise<void> {
        if (!this.email || !this.answer) return;
        const password = await this.auth.recoverPassword(this.email, this.answer);
        if (password)
            this.nav.redirectWithData('successful-pass', { password });
        else
            this.router.navigateByUrl('/wrong-pass');
    }

    constructor(private translate: TranslateService) {
        addIcons({ logoTwitter, logoInstagram, logoLinkedin });
        const lang = localStorage.getItem('lang') || 'es';
        this.translate.use(lang);
    }
}
