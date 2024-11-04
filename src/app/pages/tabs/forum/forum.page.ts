import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonInput, IonTextarea, IonButton, IonIcon, IonList, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, ToastController } from '@ionic/angular/standalone';
import { pencilOutline, trashOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { PostsService } from 'src/app/services/posts/posts.service'; 
import { Post } from 'src/app/_utils/interfaces/post.interface';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.page.html',
  styleUrls: ['./forum.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle,
    IonToolbar, CommonModule, FormsModule,
    IonCard, IonInput, IonTextarea, IonButton,
    IonIcon, IonList, IonInfiniteScroll, IonInfiniteScrollContent,
    IonItem, TranslateModule
  ]
})
export class ForumPage implements OnInit {
  
  items: Post[] = [];
  newPost: Post = { id: 0, email: '', name: '', lastname: '', title: '', content: '' }; 

  constructor(private translate: TranslateService, 
              private postsService: PostsService,
              private toastController: ToastController) { // Añadir el ToastController
    addIcons({ pencilOutline, trashOutline }); 
    const lang = localStorage.getItem('lang') || 'es';
    this.translate.use(lang);
  }

  ngOnInit() {
    this.loadPosts(); 
  }

  private async loadPosts() {
    this.items = await this.postsService.getAll(); 
  }

  async createPost() {
    if (this.newPost.title && this.newPost.content) {
      if (this.newPost.id === 0) {
        // Generar un nuevo ID para el post
        const newId = this.items.length ? Math.max(...this.items.map(item => item.id)) + 1 : 1; // Asigna un ID único
        this.newPost.id = newId; // Asignar el nuevo ID al post
        const createdPost = await this.postsService.create(this.newPost);
        this.items.push(createdPost); 
      } else {
        await this.updatePost();
      }
      this.newPost = { id: 0, email: '', name: '', lastname: '', title: '', content: '' }; 
    } else {
      this.presentToast('El título y el contenido no pueden estar vacíos.'); // Mensaje de error
    }
  }

  async deletePost(id: number) {
    await this.postsService.delete(id);
    this.items = this.items.filter(post => post.id !== id); 
  }

  editPost(post: Post) {
    this.newPost = { ...post };
  }

  async updatePost() {
    if (this.newPost.title && this.newPost.content) {
      await this.postsService.update(this.newPost);
      const index = this.items.findIndex(item => item.id === this.newPost.id);
      if (index !== -1) {
        this.items[index] = { ...this.newPost };
      }
      this.newPost = { id: 0, email: '', name: '', lastname: '', title: '', content: '' }; 
    } else {
      this.presentToast('El título y el contenido no pueden estar vacíos.'); // Mensaje de error
    }
  }

  // Función para mostrar el toast
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'danger'
    });
    await toast.present();
  }

  onIonInfinite(ev: InfiniteScrollCustomEvent) { 
    setTimeout(() => {
      ev.target.complete();
    }, 500);
  }
}
