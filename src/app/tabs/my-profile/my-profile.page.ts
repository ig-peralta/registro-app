import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { EducationLevel } from 'src/app/_utils/enums/education-level.enum';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { SessionService } from 'src/app/services/session/session.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyProfilePage implements OnInit {
  private readonly session = inject(SessionService);
  private readonly auth = inject(AuthService);
  private readonly nav = inject(NavigationService);
  private readonly users = inject(UsersService);
  private readonly toast = inject(ToastController);

  userId: number = 0;
  user: User | null = null;
  username: string = '';
  name: string = '';
  lastname: string = '';
  email: string = '';
  educationLevel: string = '';
  securityQuestion: string ='';
  securityAnswer: string = '';
  birthdate: Date = new Date();
  educationLevels = Object.values(EducationLevel).slice(0, 6);

  ngOnInit(): void {
    this.setUserData();
    this.setUpdateUserForm();
  }

  // TODO: code review and refactor all this class, there has be a better way to do this
  // maybe using a form group and form control

  setUserData(): void {
    this.session.user.subscribe((user: User | null) => {
      this.userId = user?.id || 0;
      this.username = user?.username || '';
      this.name = user?.name || '';
      this.email = user?.email || '';
      this.lastname = user?.lastname || '';
      if (user?.educationLevel)
        this.educationLevel = EducationLevel[user.educationLevel] || '';
      this.securityQuestion = user?.securityQuestion || '';
      this.securityAnswer = user?.securityAnswer || '';
      this.birthdate = user?.birthdate || new Date();
    });
  }

  setUpdateUserForm(): void {}

  updateUser(): void {
    // XD
    if (!this.username || !this.birthdate || !this.email || !this.username || !this.birthdate || !this.email || !this.name || !this.lastname || !this.educationLevel || !this.securityQuestion || !this.securityAnswer) {
      this.toast.create({
        message: 'No puede haber campos vacíos',
        duration: 3000,
      }).then(toast => toast.present());
      return;
    }
    const payload = {
      username: this.username,
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      educationLevel: EducationLevel[this.educationLevel as keyof typeof EducationLevel] || 0,
      securityQuestion: this.securityQuestion,
      birthdate: this.birthdate,
      securityAnswer: this.securityAnswer,
    };
    const user = this.users.updateUser(this.userId, payload);
    if (user) {
      this.session.user = user;
      this.setUpdateUserForm();
      this.toast.create({
        message: 'Datos actualizados con éxito',
        duration: 3000,
      }).then(toast => toast.present());
    }
  }

  logout(): void {
    this.auth.logout();
  }

  goChangePassword(){
    this.nav.redirectWithData('change-password', {userId: this.userId});
  }

}
