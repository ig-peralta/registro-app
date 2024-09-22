import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-my-class',
  templateUrl: './my-class.page.html',
  styleUrls: ['./my-class.page.scss'],
})
export class MyClassPage implements OnInit {
  private readonly router = inject(Router);

  private _scanned = new BehaviorSubject<boolean>(false);
  private _class = new BehaviorSubject<any | null>(null);

  ngOnInit() {
  }

  set scanned(value: boolean) {
    this._scanned.next(value);
  }

  set class(value: any | null) {
    this._class.next(value);
  }

  goToHome(): void {
    this.router.navigateByUrl('/tabs/home');
  }
}
