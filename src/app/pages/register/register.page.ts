import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonFooter, IonIcon, IonCard, IonList, IonInput, IonSelectOption, IonSelect, IonInputPasswordToggle, IonButton, ToastController } from '@ionic/angular/standalone';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from "ionicons";
import { logoTwitter, logoInstagram, logoLinkedin } from "ionicons/icons";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EducationLevel } from 'src/app/_utils/enums/education-level.enum';
import { MatNativeDateModule } from '@angular/material/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle,
    IonToolbar, CommonModule, FormsModule,
    IonButtons, IonBackButton, TranslateModule,
     IonFooter, IonIcon, IonCard, IonList,
     IonInput, IonSelectOption, MatInputModule,
     MatDatepickerModule, MatFormFieldModule, IonSelect,
     MatNativeDateModule, IonInputPasswordToggle, IonButton ],
     providers: [MatDatepickerModule],
})
export class RegisterPage implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly toast = inject(ToastController);
  private readonly router = inject(Router);

  username: string = '';
  name: string = '';
  lastname: string = '';
  email: string = '';
  address: string = '';
  securityQuestion: string = '';
  securityAnswer: string = '';
  educationLevel: number = 0;
  password: string = '';
  confirmPassword: string = '';
  birthdate: Date = new Date();

  educationLevelOptions: { id: number, name: string }[] = [];

  constructor(private translate: TranslateService) {
    addIcons({ logoTwitter, logoInstagram, logoLinkedin });
    const lang = localStorage.getItem('lang') || 'es';
    this.translate.use(lang);
  }

  ngOnInit() {
    this.setEducationLevelOptions();
  }

  setEducationLevelOptions() {
    for (let i = 1; i <= 6; i++) {
      this.educationLevelOptions.push({ id: i, name: EducationLevel[i] });
    }
  }

  async register() {
    const error = await this.auth.register({
      username: this.username,
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      address: this.address,
      securityQuestion: this.securityQuestion,
      securityAnswer: this.securityAnswer,
      educationLevel: this.educationLevel,
      password: this.password,
      birthdate: this.birthdate,
      isAdmin: 0
    });
    if (error) {
      this.toast.create({
        message: error,
        duration: 2000
      }).then(toast => toast.present());
    } else {
      this.router.navigateByUrl('/tabs/home');
    }
  }

}
