import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {
  private readonly session = inject(SessionService);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);

  user: User | null = null;
  name: string = '';
  lastname: string = '';
  email: string = '';
  educationLevel: string = '';
  securityQuestion: string ='';
  securityAnswer: string = '';

  ngOnInit(): void {
    this.session.user.subscribe((user: User | null) => {
      this.name = user?.name || '';
      this.lastname = user?.lastname || '';
      this.email = user?.email || '';
      this.educationLevel = user?.educationLevel || '';
      this.securityQuestion = user?.securityQuestion || '';
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  goChangePassword(){
    this.router.navigate(['/change-password'])
  }
  
}
