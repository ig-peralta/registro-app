import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { User } from 'src/app/_utils/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private _user = new BehaviorSubject<User | null>(null);

  constructor(private readonly storage: LocalStorageService) {
    this.status();
  }

  set user(user: User | null) {
    this._user.next(user);
    if (user)
      this.storage.setItem('user', user);
    else
      this.storage.removeItem('user');
  }

  get user(): Observable<User | null> {
    return this._user.asObservable();
  }

  status(): void {
    const user = this.storage.getItem('user');
    if (user)
      this._user.next(user);
  }
}
