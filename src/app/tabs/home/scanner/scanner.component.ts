import { Component, ElementRef, ViewChild, AfterViewInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import jsQR, { QRCode } from 'jsqr';
import { ClassService } from 'src/app/services/class/class.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
})
export class ScannerComponent implements AfterViewInit {
  classService = inject(ClassService);
  router = inject(Router);

  @ViewChild('video') private video!: ElementRef;
  @ViewChild('canvas') private canvas!: ElementRef;
  scanning: boolean = false;

  ngAfterViewInit() {
    // Inicia el escaneo aquí ya que las vistas ya están listas.
    this.startScanning();
  }

  public async startScanning() {
    try {
      const mediaProvider: MediaProvider = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' } // Usa 'environment' para la cámara trasera
      });
      this.video.nativeElement.srcObject = mediaProvider;
      this.video.nativeElement.setAttribute('playsinline', 'true');
      this.video.nativeElement.play();
      this.scanning = true;
      requestAnimationFrame(this.verifyMediaSource.bind(this));
    } catch (err) {
      console.error('Error al acceder a la cámara: ', err);
    }
  }

  async verifyMediaSource() {
    if (this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGH_DATA) {
      if (this.retrieveQrData() || !this.scanning) return;
      requestAnimationFrame(this.verifyMediaSource.bind(this));
    } else {
      requestAnimationFrame(this.verifyMediaSource.bind(this));
    }
  }

  public retrieveQrData(): boolean {
    const w: number = this.video.nativeElement.videoWidth;
    const h: number = this.video.nativeElement.videoHeight;
    this.canvas.nativeElement.width = w;
    this.canvas.nativeElement.height = h;
    const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d', { willReadFrequently: true });
    context.drawImage(this.video.nativeElement, 0, 0, w, h);
    const img: ImageData = context.getImageData(0, 0, w, h);
    let qrCode: QRCode | null = jsQR(img.data, w, h, { inversionAttempts: 'dontInvert' });
    if (qrCode) {
      if (qrCode.data !== '') {
        this.scanning = false;
        this.setClass(qrCode.data);
        return true;
      }
    }
    return false;
  }

  public setClass(qrData: string): void {
    this.classService.class = JSON.parse(qrData);
    this.router.navigateByUrl('/tabs/my-class');
  }
}
