import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserData } from 'src/app/_utils/interfaces/user-data.interface';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private _user = new BehaviorSubject<UserData | null>(null);

  constructor(private readonly storage: LocalStorageService) {
    this.checkUser();
  }

  set user(user: UserData | null) {
    this._user.next(user);
  }

  get user(): Observable<UserData | null> {
    return this._user.asObservable();
  }

  checkUser(): void {
    const user = this.storage.getItem('user');
    if (user)
      this._user.next(user);
  }

  status(): UserData | null {
    return this._user.getValue();
  }
}
