import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import jsQR, { QRCode } from 'jsqr';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
})
export class ScannerComponent implements OnInit, AfterViewInit {
  @ViewChild('video') private video!: ElementRef;
  @ViewChild('canvas') private canvas!: ElementRef;

  public escaneando = false;
  public datosQR: string = '';
  asistencia: any = {};

  ngOnInit() {
    // Si necesitas hacer algo aquí antes de inicializar las vistas.
  }

  ngAfterViewInit() {
    // Inicia el escaneo aquí ya que las vistas ya están listas.
    this.comenzarEscaneoQR();
  }

  public async comenzarEscaneoQR() {
    try {
      const mediaProvider: MediaProvider = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' } // Usa 'environment' para la cámara trasera
      });
      this.video.nativeElement.srcObject = mediaProvider;
      this.video.nativeElement.setAttribute('playsinline', 'true');
      this.video.nativeElement.play();
      this.escaneando = true;
      requestAnimationFrame(this.verificarVideo.bind(this));
    } catch (err) {
      console.error('Error al acceder a la cámara: ', err);
    }
  }

  async verificarVideo() {
    if (this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGH_DATA) {
      if (this.obtenerDatosQR() || !this.escaneando) return;
      requestAnimationFrame(this.verificarVideo.bind(this));
    } else {
      requestAnimationFrame(this.verificarVideo.bind(this));
    }
  }

  public obtenerDatosQR(): boolean {
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
        this.escaneando = false;
        this.mostrarDatosQROrdenados(qrCode.data);
        return true;
      }
    }
    return false;
  }

  public mostrarDatosQROrdenados(datosQR: string): void {
    this.datosQR = datosQR;
    this.asistencia = JSON.parse(datosQR);
    console.log(this.asistencia);
  }

  public detenerEscaneoQR(): void {
    this.escaneando = false;
    const stream = this.video.nativeElement.srcObject as MediaStream;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop()); // Detener todas las pistas de la cámara
    this.video.nativeElement.srcObject = null;
  }
}
