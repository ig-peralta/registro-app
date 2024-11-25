import { Component, OnInit, inject } from '@angular/core';
import { IonButton, IonCard, IonContent, IonHeader, IonInput, IonList, IonSelect, IonSelectOption, IonTitle, IonToolbar, ToastController, ViewWillEnter, ViewWillLeave, IonIcon } from '@ionic/angular/standalone';
import { EducationLevel } from 'src/app/_utils/enums/education-level.enum';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { SessionService } from 'src/app/services/session/session.service';
import { UsersService } from 'src/app/services/users/users.service';
import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { addIcons } from "ionicons";
import { createOutline, keyOutline } from "ionicons/icons";
import { MatNativeDateModule } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { User } from 'src/app/_utils/interfaces/user.interface';

@Component({
    selector: 'app-my-profile',
    templateUrl: './my-profile.page.html',
    styleUrls: ['./my-profile.page.scss'],
    standalone: true,
    imports: [
      IonIcon, IonButton, IonSelect,
      IonInput, MatInputModule, MatDatepickerModule,
      CommonModule, FormsModule, MatFormFieldModule,
      IonList, IonSelect, IonTitle,
      IonSelectOption, IonCard, IonContent,
      IonToolbar, IonHeader, IonHeader,
      IonToolbar, IonTitle, IonContent,
      IonCard, IonList, IonInput,
      IonSelect, IonSelectOption, IonButton,
      IonIcon, MatNativeDateModule, TranslateModule
    ],
    providers: [MatDatepickerModule],
    animations: [
        trigger('pageAnimation', [
            transition('* => animate', [
                query('.animate-item', [
                    style({ opacity: 0, transform: 'translateY(50px)' }),
                    stagger(100, [
                        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
                    ])
                ], { optional: true })
            ])
        ]),
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
})
export class MyProfilePage implements OnInit, ViewWillEnter, ViewWillLeave {
    private readonly session = inject(SessionService);
    private readonly auth = inject(AuthService);
    private readonly nav = inject(NavigationService);
    private readonly users = inject(UsersService);
    private readonly toast = inject(ToastController);

    user: User | null = null;
    username: string = '';
    name: string = '';
    lastname: string = '';
    email: string = '';
    address: string = '';
    educationLevel: string = '';
    securityQuestion: string = '';
    securityAnswer: string = '';
    birthdate: Date = new Date();
    educationLevels = Object.values(EducationLevel).slice(0, 6);
    shakeState: string = '';
    animateState: string = '';
    today = new Date();

    ngOnInit(): void {
        this.setUserData();
        this.setUpdateUserForm();
        this.animateState = "animate";
    }

    ionViewWillEnter(): void {
        this.animateState = "animate";
    }

    ionViewWillLeave(): void {
        this.animateState = "";
    }

    // TODO: code review and refactor all this class, there has be a better way to do this
    // maybe using a form group and form control

    setUserData(): void {
        this.session.user.subscribe((user: User | null) => {
            this.user = user;
            this.username = user?.username || '';
            this.name = user?.name || '';
            this.email = user?.email || '';
            this.lastname = user?.lastname || '';
            if (user?.educationLevel)
                this.educationLevel = EducationLevel[user.educationLevel] || '';
            this.securityQuestion = user?.securityQuestion || '';
            this.securityAnswer = user?.securityAnswer || '';
            this.birthdate = user?.birthdate || new Date();
            this.address = user?.address || '';
        });
    }

    setUpdateUserForm(): void { }

    async updateUser() {
        if (!this.username.trim() || !this.birthdate || !this.email.trim() || !this.name.trim() || !this.lastname.trim() || !this.educationLevel || !this.securityQuestion.trim() || !this.securityAnswer.trim()) {
            this.toast.create({
                message: 'No puede haber campos vacíos',
                duration: 3000,
                position: 'top'
            }).then(toast => toast.present());
            this.shakeState = "shake"
            return;
        } else if (!this.validateEmail(this.email)) {
          this.toast.create({
            message: 'Email no válido',
            duration: 3000,
            position: 'top'
          }).then(toast => toast.present());
          this.shakeState = "shake"
          return;
        }
        const payload: User = {
            id: this.user?.id,
            username: this.username,
            name: this.name,
            lastname: this.lastname,
            password: this.user?.password || '',
            email: this.email,
            address: this.address,
            educationLevel: EducationLevel[this.educationLevel as keyof typeof EducationLevel] || 0,
            securityQuestion: this.securityQuestion,
            birthdate: this.birthdate,
            securityAnswer: this.securityAnswer,
            isAdmin: this.user?.isAdmin || 0
        };
        try {
          const user = await this.users.update(payload);
          if (user) {
              this.session.user = user;
              this.setUpdateUserForm();
              this.toast.create({
                  message: 'Datos actualizados con éxito',
                  duration: 3000,
                  position: 'top'
              }).then(toast => toast.present());
          }
        } catch (error) {
          this.toast.create({
            message: 'Error al actualizar los datos',
            duration: 3000,
            position: 'top'
          }).then(toast => toast.present());
        }
      }

    logout(): void {
        this.auth.logout();
    }

    goChangePassword() {
        this.nav.redirectWithData('change-password', { username: this.user?.username });
    }

    resetAnimations() {
        this.shakeState = '';
    }

    validateEmail(email: string): boolean {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return regex.test(email);
    }

    constructor(private translate: TranslateService) {
        addIcons({ createOutline, keyOutline });
        const lang = localStorage.getItem('lang') || 'es';
        this.translate.use(lang);
    }
}
