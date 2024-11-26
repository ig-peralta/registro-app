import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ScannerService {
  private _loading = new BehaviorSubject<boolean>(false);
  private _scanning = new BehaviorSubject<boolean>(false);

  constructor(private platform: Platform) {}

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

  async startScan(): Promise<string | null> {
    // Check if app is running on a device
    if (!this.platform.is('hybrid')) {
      console.error('Native scanner only works on real devices');
      return null;
    }

    // Check permissions
    const status = await BarcodeScanner.checkPermission({ force: true });
    if (!status.granted) {
      return null;
    }

    // Make background transparent
    document.querySelector('body')?.classList.add('scanner-active');
    this._scanning.next(true);
    const result = await BarcodeScanner.startScan();
    document.querySelector('body')?.classList.remove('scanner-active');

    if (result.hasContent) {
      this._scanning.next(false);
      return result.content;
    }
    return null;
  }

  async stopScan() {
    document.querySelector('#scanner')?.classList.remove('scanner-active');
    await BarcodeScanner.stopScan();
    this._scanning.next(false);
  }
}
