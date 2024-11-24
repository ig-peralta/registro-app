import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { Post } from 'src/app/_utils/interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private readonly http = inject(HttpClient);

  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'access-control-allow-origin': '*'
    })
  };
  posts: BehaviorSubject<Post[]> =  new BehaviorSubject<Post[]>([]);
  apiUrl = 'http://localhost:3000';

  async create(post: Post): Promise<Post> {
    const parsedPost: any = post;
    parsedPost.id = post.id.toString();
    const newPost = await lastValueFrom(this.http.post<Post>(this.apiUrl + '/posts/', parsedPost, this.httpOptions));
    return newPost;
  }

  async getAll(): Promise<Post[]> {
    const posts = await lastValueFrom(this.http.get<Post[]>(this.apiUrl + '/posts/'));
    return posts;
  }

  async findOne(id: number): Promise<Post> {
    const post = await lastValueFrom(this.http.get<Post>(this.apiUrl + '/posts/' + id));
    return post;
  }

  async update(post: Post): Promise<Post> {
    const newPost = await lastValueFrom(this.http.put<Post>(this.apiUrl + '/posts/' + post.id, post, this.httpOptions));
    return newPost;
  }

  async delete(id: number): Promise<void> {
    await lastValueFrom(this.http.delete(this.apiUrl + '/posts/' + id, this.httpOptions));
  }
}
