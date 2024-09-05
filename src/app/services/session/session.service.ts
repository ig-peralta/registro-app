import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserData } from 'src/app/_utils/interfaces/user-data.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private _user = new BehaviorSubject<UserData | null>(null);

  constructor() {}

  set user(user: UserData | null) {
    this._user.next(user);
  }

  get user(): Observable<UserData | null> {
    return this._user.asObservable();
  }
}
