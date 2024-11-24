import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonInput, IonTextarea, IonButton, IonIcon, IonList, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, ToastController, IonCardHeader, IonCardTitle, IonCardContent, IonItemSliding } from '@ionic/angular/standalone';
import { pencilOutline, trashOutline, createOutline, timeOutline, sendOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { PostsService } from 'src/app/services/posts/posts.service';
import { SessionService } from 'src/app/services/session/session.service';
import { Post } from 'src/app/_utils/interfaces/post.interface';
import { User } from 'src/app/_utils/interfaces/user.interface';

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
    IonItem, TranslateModule, IonCardHeader, IonCardTitle, IonCardContent, IonItemSliding
  ]
})
export class ForumPage implements OnInit {

  items: Post[] = [];
  newPost: Post = { id: 0, email: '', name: '', lastname: '', title: '', content: '' };
  private readonly session = inject(SessionService);
  user: User | null = null;

  constructor(private translate: TranslateService,
              private postsService: PostsService,
              private toastController: ToastController) {
    addIcons({ pencilOutline,
                trashOutline,
                createOutline,
                timeOutline,
                sendOutline  });
    const lang = localStorage.getItem('lang') || 'es';
    this.translate.use(lang);
  }

  ngOnInit() {
    this.loadPosts();
    this.session.user.subscribe((user: User | null) => {
      this.user = user;
    });
  }

  private async loadPosts() {
    try {
      this.items = await this.postsService.getAll();
    } catch (error) {
      this.presentToast('Error al cargar las publicaciones. Intenta nuevamente.');
    }
  }

  async createPost() {
    if (this.newPost.title && this.newPost.content) {
      try {
        if (this.user) {
          this.newPost.email = this.user.email;
          this.newPost.name = this.user.name;
          this.newPost.lastname = this.user.lastname;
        }

        if (this.newPost.id === 0) {
          const newId = this.items.length ? Math.max(...this.items.map(item => item.id)) + 1 : 1;
          this.newPost.id = newId;
          const createdPost = await this.postsService.create(this.newPost);
          this.items.push(createdPost);
          this.presentToast('Publicación guardada correctamente.');
        } else {
          await this.updatePost();
        }
        this.newPost = { id: 0, email: '', name: '', lastname: '', title: '', content: '' };
      } catch (error) {
        this.presentToast('Error al crear la publicación. Intenta nuevamente.');
      }
    } else {
      this.presentToast('El título y el contenido no pueden estar vacíos.');
    }
}


  async deletePost(id: number) {
    try {
      await this.postsService.delete(id);
      this.items = this.items.filter(post => post.id !== id);
    } catch (error) {
      this.presentToast('Error al eliminar la publicación. Intenta nuevamente.');
    }
  }

  editPost(post: Post) {
    this.newPost = { ...post };
  }

  async updatePost() {
    if (this.newPost.title && this.newPost.content) {
      try {
        await this.postsService.update(this.newPost);
        const index = this.items.findIndex(item => item.id === this.newPost.id);
        if (index !== -1) {
          this.items[index] = { ...this.newPost };
        }
        this.newPost = { id: 0, email: '', name: '', lastname: '', title: '', content: '' };
      } catch (error) {
        this.presentToast('Error al actualizar la publicación. Intenta nuevamente.');
      }
    } else {
      this.presentToast('El título y el contenido no pueden estar vacíos.');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
    });
    await toast.present();
  }

  onIonInfinite(ev: InfiniteScrollCustomEvent) {
    setTimeout(() => {
      ev.target.complete();
    }, 500);
  }
}
