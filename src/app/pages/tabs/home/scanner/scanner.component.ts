import { Component, ElementRef, ViewChild, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular/standalone';
import jsQR, { QRCode } from 'jsqr';
import { assertClass } from 'src/app/_utils/custom.asserts';
import { Class } from 'src/app/_utils/interfaces/class.interface';
import { ClassService } from 'src/app/services/class/class.service';
import { ScannerService } from 'src/app/services/scanner/scanner.service';
import { IonSpinner } from "@ionic/angular/standalone";

@Component({
    selector: 'app-scanner',
    templateUrl: './scanner.component.html',
    styleUrls: ['./scanner.component.scss'],
    standalone: true,
    imports: [IonSpinner]
})
export class ScannerComponent implements OnInit {
    classService = inject(ClassService);
    router = inject(Router);
    scannerState = inject(ScannerService);
    toasts = inject(ToastController);

    @ViewChild('video') private video!: ElementRef;
    @ViewChild('canvas') private canvas!: ElementRef;
    scanning: boolean = true;
    mediaStream: MediaStream | null = null

    ngOnInit() {
        this.scannerState.scanning.subscribe(async state => {
            this.scanning = state
            if (this.scanning) {
                await this.startScanning();
            } else {
                await this.stopScanning();
            }
        });
    }

    async startScanning() {
        try {
            this.scannerState.loading = true;
            this.mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            });
            this.video.nativeElement.srcObject = this.mediaStream;
            this.video.nativeElement.setAttribute('playsinline', 'true');
            this.video.nativeElement.play();
            this.scannerState.loading = false;
            requestAnimationFrame(this.verifyMediaSource.bind(this));
        } catch (err) {
            this.toasts.create({
                message: 'Error al acceder a tu cámara',
                duration: 2000
            }).then(toast => toast.present());
            console.error(err);
        }
    }

    async stopScanning() {
        if (this.mediaStream) {
            this.mediaStream.getTracks().forEach(track => track.stop());
            this.mediaStream = null;
        }
        this.video.nativeElement.srcObject = null;
    }

    async verifyMediaSource() {
        if (this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGH_DATA) {
            if (!this.scanning)
                return;
            this.retrieveQrData();
            requestAnimationFrame(this.verifyMediaSource.bind(this));
        } else {
            requestAnimationFrame(this.verifyMediaSource.bind(this));
        }
    }

    retrieveQrData(): void {
        const w: number = this.video.nativeElement.videoWidth;
        const h: number = this.video.nativeElement.videoHeight;
        this.canvas.nativeElement.width = w;
        this.canvas.nativeElement.height = h;
        const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d', { willReadFrequently: true });
        context.drawImage(this.video.nativeElement, 0, 0, w, h);
        const img: ImageData = context.getImageData(0, 0, w, h);
        let qrCode: QRCode | null = jsQR(img.data, w, h, { inversionAttempts: 'dontInvert' });
        if (qrCode && qrCode.data !== '') {
            this.setClass(qrCode.data);
        }
    }

    setClass(qrData: string): void {
        console.log(JSON.parse(qrData))
        try {
            const parsedData = JSON.parse(qrData) as Class;
            assertClass(parsedData)
        } catch (err) {
            this.toasts.create({
                message: 'QR Invalido',
                duration: 2000
            }).then(toast => toast.present());
            this.scannerState.scanning = false
            setTimeout(() => this.scannerState.scanning = true, 2000)
            return;
        }
        this.classService.class = JSON.parse(qrData);
        this.scannerState.scanning = false;
        this.router.navigateByUrl('/tabs/my-class');
    }
}
