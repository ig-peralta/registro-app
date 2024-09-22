import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private _class = new BehaviorSubject<any | null>(null);

  set class(value: any | null) {
    this._class.next(value);
  }

  get class() {
    return this._class.asObservable();
  }
}
