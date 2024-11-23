import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardHeader, IonCardTitle, IonCard, IonList, IonItem, IonItemSliding, IonButton, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/angular/standalone';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

interface User {
  id: number;
  name: string;
  email: string;
}

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
  users: User[] = [
    { id: 1, name: 'Juan Pérez', email: 'juan.perez@duoc.cl' },
    { id: 2, name: 'María González', email: 'maria.gonzalez@duoc.cl' },
    { id: 3, name: 'Carlos Rodríguez', email: 'carlos.rodriguez@duoc.cl' },
    { id: 4, name: 'Ana Silva', email: 'ana.silva@duoc.cl' },
    { id: 5, name: 'Diego Muñoz', email: 'diego.munoz@duoc.cl' }
  ];

  constructor(private translate: TranslateService) {
    const lang = localStorage.getItem('lang') || 'es';
    this.translate.use(lang);
    addIcons({ trashOutline });
  }

  ngOnInit() {
  }

  deleteUser(id: number) {
    this.users = this.users.filter(user => user.id !== id);
  }

  onIonInfinite(ev: InfiniteScrollCustomEvent) {
    setTimeout(() => {
      ev.target.complete();
    }, 500);
  }
}