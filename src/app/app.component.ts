import { Component, OnInit, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { UsersService } from './services/users/users.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    IonApp,
    IonRouterOutlet,
    TranslateModule
  ],
})
export class AppComponent implements OnInit {
  constructor(private translate: TranslateService) {
    translate.use('es');
  }

  private readonly users = inject(UsersService);

  async ngOnInit() {
    this.users.initDb();
    this.users.createTestUsers();
  }
}
