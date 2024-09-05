import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/app/_utils/interfaces/user-data.interface';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

  user: UserData | null = null;
  name: string = '';
  email: string = '';
  educationLevel: string = '';

  constructor(
    private readonly session: SessionService,
  ) {}

  ngOnInit() {
    this.session.user.subscribe((user: UserData | null) => {
      this.name = user?.name || '';
      this.email = user?.email || '';
      this.educationLevel = user?.educationLevel || '';
    })
  }
}
