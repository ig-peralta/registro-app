import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { User } from 'src/app/_utils/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private readonly storage = inject(LocalStorageService);

  private _user = new BehaviorSubject<User | null>(null);

  constructor() {
    this.checkUser();
  }

  set user(user: User | null) {
    if (user)
      this.storage.setItem('user', user);
    else
      this.storage.removeItem('user');
    this._user.next(user);
  }

  get user(): Observable<User | null> {
    return this._user.asObservable();
  }

  get userSnapshot(): User | null {
    return this._user.getValue();
  }

  checkUser(): void {
    const user = this.storage.getItem('user');
    if (user)
      this._user.next(user);
  }

  status(): User | null {
    return this._user.getValue();
  }
}
