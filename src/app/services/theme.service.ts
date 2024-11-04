
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<string>('claro');
  public theme$ = this.themeSubject.asObservable();

  setTheme(theme: string) {
    this.themeSubject.next(theme);
    document.body.className = ''; 
    document.body.classList.add(theme); 
  }
}
