import { Component, OnInit, inject, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SessionService } from 'src/app/services/session/session.service';
import { AnimationController } from '@ionic/angular/standalone';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonSpinner, IonButton } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { ScannerComponent } from './scanner/scanner.component';
import { ScannerService } from 'src/app/services/scanner/scanner.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { User } from 'src/app/_utils/interfaces/user.interface';
import { ToastController } from '@ionic/angular/standalone';
import { Class } from 'src/app/_utils/interfaces/class.interface';
import { ClassService } from 'src/app/services/class/class.service';
import { assertClass } from 'src/app/_utils/custom.asserts';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    ScannerComponent, CommonModule, IonHeader,
    IonToolbar, IonTitle, IonContent,
    IonCard, TranslateModule,
    IonButton
  ]
})

export class HomePage implements OnInit {
    session = inject(SessionService);
    auth = inject(AuthService);
    router = inject(Router);
    nav = inject(NavigationService);
    scanner = inject(ScannerService);
    classService = inject(ClassService);
    toasts = inject(ToastController);

    @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;

    name: string = '';
    lastname: string = '';
    scanning: boolean = false;

    constructor(private translate: TranslateService, private animationController: AnimationController) {
        const lang = localStorage.getItem('lang') || 'es';
        this.translate.use(lang);
    }

    ngOnInit() {
        this.session.user.subscribe((user: User | null) => {
            this.name = user?.name || '';
            this.lastname = user?.lastname || '';
        })
        this.scanner.scanning.subscribe(scanning => this.scanning = scanning);
    }

    ngAfterViewInit() {
        this.animateTitle();
    }

    logout() {
        this.auth.logout();
        this.router.navigateByUrl('/login');
    }

    animateTitle() {
        this.animationController
            .create()
            .addElement(this.itemTitulo.nativeElement)
            .iterations(Infinity)
            .duration(6000)
            .fromTo('transform', 'translate(0%)', 'translate(100%)')
            .play();
    }
    async startScan() {
        const qrData = await this.scanner.startScan();
        if (qrData) {
          try {
            const parsedData = JSON.parse(qrData) as Class;
            assertClass(parsedData);
            this.classService.class = parsedData;
            this.router.navigateByUrl('/tabs/my-class');
          } catch (err) {
            const toast = await this.toasts.create({
              message: 'QR Inválido',
              duration: 2000
            });
            await toast.present();
          }
        }
    }
}

