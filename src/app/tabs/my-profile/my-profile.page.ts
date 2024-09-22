import { Component, OnInit, inject } from '@angular/core';
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
})
export class MyProfilePage implements OnInit {
  private readonly session = inject(SessionService);
  private readonly auth = inject(AuthService);
  private readonly nav = inject(NavigationService);
  private readonly users = inject(UsersService);
  private readonly toast = inject(ToastController);

  userId: number = 0;
  user: User | null = null;
  name: string = '';
  lastname: string = '';
  educationLevel: string = '';
  securityQuestion: string ='';
  securityAnswer: string = '';
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
      this.name = user?.name || '';
      this.lastname = user?.lastname || '';
      if (user?.educationLevel)
        this.educationLevel = EducationLevel[user.educationLevel] || '';
      this.securityQuestion = user?.securityQuestion || '';
      this.securityAnswer = user?.securityAnswer || '';
      console.log(user);
    });
  }

  setUpdateUserForm(): void {}

  updateUser(): void {
    // XD
    if (!this.name || !this.lastname || !this.educationLevel || !this.securityQuestion || !this.securityAnswer) {
      this.toast.create({
        message: 'No puede haber campos vacíos',
        duration: 3000,
      }).then(toast => toast.present());
      return;
    }
    const payload = {
      name: this.name,
      lastname: this.lastname,
      educationLevel: EducationLevel[this.educationLevel as keyof typeof EducationLevel] || 0,
      securityQuestion: this.securityQuestion,
      securityAnswer: this.securityAnswer,
    };
    const user = this.users.updateUser(this.userId, payload);
    if (user) {
      this.session.user = user;
      this.setUpdateUserForm();
    }
  }

  logout(): void {
    this.auth.logout();
  }

  goChangePassword(){
    this.nav.redirectWithData('change-password', {userId: this.userId});
  }

}
