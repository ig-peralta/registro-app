import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonInput, IonTextarea, IonButton, IonIcon } from '@ionic/angular/standalone';
import { pencilOutline, trashOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.page.html',
  styleUrls: ['./forum.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle,
            IonToolbar, CommonModule, FormsModule,
            IonCard, IonInput, IonTextarea, IonButton,
            IonIcon ]
})
export class ForumPage implements OnInit {

  constructor() { addIcons({ pencilOutline, trashOutline }); }

  ngOnInit() {
  }

}
