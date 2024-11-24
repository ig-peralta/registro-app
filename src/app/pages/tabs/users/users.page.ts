import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardHeader, IonCardTitle, IonCard, IonList, IonItem, IonItemSliding, IonButton, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/angular/standalone';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';
import { InfiniteScrollCustomEvent, ToastController } from '@ionic/angular';
import { UsersService } from 'src/app/services/users/users.service';
import { User } from 'src/app/_utils/interfaces/user.interface';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    CommonModule, FormsModule, TranslateModule,
    IonCardHeader, IonCardTitle, IonCard, IonList,
    IonItem, IonItemSliding, IonButton, IonIcon,
    IonInfiniteScroll, IonInfiniteScrollContent
  ]
})
export class UsersPage implements OnInit {
  private readonly usersService = inject(UsersService);
  private readonly toast = inject(ToastController);
  private readonly session = inject(SessionService);

  users: User[] = [];
  currentUser: User | null = null;

  constructor(private translate: TranslateService) {
    const lang = localStorage.getItem('lang') || 'es';
    this.translate.use(lang);
    addIcons({ trashOutline });
  }

  async ngOnInit() {
    this.users = await this.usersService.findAll();
    this.session.user.subscribe(user => this.currentUser = user);
  }

  async deleteUser(username: string) {
    if (!this.currentUser || !this.currentUser.isAdmin) {
      this.toast.create({
        message: 'No tienes permisos para realizar esta acción',
        duration: 2000
      }).then(toast => toast.present());
      return;
    } else if (this.currentUser.username === username) {
      this.toast.create({
        message: 'No puedes eliminarte a ti mismo',
        duration: 2000
      }).then(toast => toast.present());
      return;
    } else {
      await this.usersService.delete(username);
      this.users = this.users.filter(user => user.username !== username);
      this.toast.create({
        message: 'Usuario eliminado',
        duration: 2000
      }).then(toast => toast.present());
    }
  }

  onIonInfinite(ev: InfiniteScrollCustomEvent) {
    setTimeout(() => {
      ev.target.complete();
    }, 500);
  }
}
