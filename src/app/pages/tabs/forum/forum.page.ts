import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonInput, IonTextarea, IonButton, IonIcon, IonList, IonInfiniteScroll, IonInfiniteScrollContent, IonItem } from '@ionic/angular/standalone';
import { pencilOutline, trashOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.page.html',
  styleUrls: ['./forum.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle,
            IonToolbar, CommonModule, FormsModule,
            IonCard, IonInput, IonTextarea, IonButton,
            IonIcon, IonList, IonInfiniteScroll,IonInfiniteScrollContent,
            IonItem ]
})
export class ForumPage implements OnInit {
  
  items: string[] = []; 

  constructor() { 
    addIcons({ pencilOutline, trashOutline }); 
  }

  ngOnInit() {
    this.generateItems();
  }

  private generateItems() {
    const count = this.items.length + 1; 
    for (let i = 0; i < 50; i++) {
      this.items.push(`Item ${count + i}`);
    }
  }

  onIonInfinite(ev: InfiniteScrollCustomEvent) { 
    this.generateItems();
    setTimeout(() => {
      ev.target.complete();
    }, 500);
  }
}
