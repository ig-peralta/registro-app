import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Class } from 'src/app/_utils/interfaces/class.interface';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private _class = new BehaviorSubject<Class | null>(null);

  set class(value: any | null) {
    this._class.next(value);
  }

  get class() {
    return this._class.asObservable();
  }
}
