import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonInputPasswordToggle, ToastController } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { addIcons } from "ionicons";
import { createOutline } from "ionicons/icons";
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonCard, IonList, IonInput, IonButton, IonIcon } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { ChangePasswordDto } from 'src/app/_utils/dto/change-password.dto';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.page.html',
    standalone: true,
    styleUrls: ['./change-password.page.scss'],
    animations: [
        trigger('shakeAnimation', [
            state('shake', style({ transform: 'translate3d(0, 0, 0)' })),
            transition('* => shake', [
                animate('0.05s', style({ transform: 'translate3d(-2px, 0, 0)' })),
                animate('0.05s', style({ transform: 'translate3d(2px, 0, 0)' })),
                animate('0.05s', style({ transform: 'translate3d(-2px, 0, 0)' })),
                animate('0.05s', style({ transform: 'translate3d(0, 0, 0)' }))
            ])
        ])
    ],
    imports: [
        IonHeader, IonToolbar, IonButtons,
        IonBackButton, IonTitle, IonContent,
        IonCard, IonList, IonInput,
        IonButton, IonIcon, CommonModule,
        ReactiveFormsModule, IonInputPasswordToggle,
        TranslateModule
    ]
})
export class ChangePasswordPage implements OnInit {
    auth = inject(AuthService);
    nav = inject(NavigationService);
    toasts = inject(ToastController);
    router = inject(Router);

    username: string = '';
    shakeState: string = '';

    changePasswordForm = new FormGroup({
        oldPassword: new FormControl('', Validators.required),
        newPassword: new FormControl('', Validators.required),
        confirmPassword: new FormControl('', Validators.required)
    });

    ngOnInit() {
        this.username = this.nav.getState().username;
    }

    // ???????? need to refactor this
    get oldPassword() {
        return this.changePasswordForm.get('oldPassword')?.value;
    }

    get newPassword() {
        return this.changePasswordForm.get('newPassword')?.value;
    }

    get confirmPassword() {
        return this.changePasswordForm.get('confirmPassword')?.value;
    }

    get oldPasswordError() {
        return this.changePasswordForm.get('oldPassword')?.hasError('required');
    }

    get newPasswordError() {
        return this.changePasswordForm.get('newPassword')?.hasError('required');
    }

    get confirmPasswordError() {
        return this.changePasswordForm.get('confirmPassword')?.hasError('required');
    }

    async changePassword(): Promise<void> {
        if (!this.oldPassword || !this.newPassword) {
            this.toasts.create({
                message: 'Debe llenar los campos',
                duration: 2000
            }).then(toast => toast.present());
            this.shakeState = 'shake'
            return
        };
        if (this.newPassword !== this.confirmPassword) {
            this.toasts.create({
                message: 'Contraseñas no coinciden',
                duration: 2000
            }).then(toast => toast.present());
            this.shakeState = 'shake'
            return;
        }
        const error = await this.auth.changePassword({
            username: this.username,
            oldPassword: this.oldPassword,
            newPassword: this.newPassword,
        } as ChangePasswordDto);
        if (error) {
            this.toasts.create({
                message: error,
                duration: 2000
            }).then(toast => toast.present());
            this.shakeState = 'shake'
        } else {
            this.router.navigateByUrl('/tabs/home');
        }
    }

    resetAnimation(): void {
        this.shakeState = "";
    }

    constructor(private translate: TranslateService) {
        addIcons({ createOutline });
        const lang = localStorage.getItem('lang') || 'es';
        this.translate.use(lang);
    }

}
