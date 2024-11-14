import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScannerService {
  private _loading = new BehaviorSubject<boolean>(true);
  private _scanning = new BehaviorSubject<boolean>(true);

  get loading(): Observable<boolean> {
    return this._loading.asObservable();
  }

  set loading(state: boolean) {
    this._loading.next(state);
  }

  get scanning(): Observable<boolean> {
    return this._scanning.asObservable();
  }

  set scanning(state: boolean) {
    this._scanning.next(state);
  }
}
