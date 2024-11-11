import { Component, OnInit, inject, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
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
import { Capacitor } from '@capacitor/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    ScannerComponent, CommonModule, IonHeader,
    IonToolbar, IonTitle, IonContent,
    IonCard, IonSpinner, TranslateModule, IonButton
  ]
})

export class HomePage implements OnInit {
    session = inject(SessionService);
    auth = inject(AuthService);
    router = inject(Router);
    nav = inject(NavigationService);
    scanner = inject(ScannerService);

    @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;
    @Output() click = new EventEmitter<string>();
    name: string = '';
    lastname: string = '';
    scannerLoading: boolean = true

    constructor(private translate: TranslateService, private animationController: AnimationController) {
        const lang = localStorage.getItem('lang') || 'es';
        this.translate.use(lang);
    }

    ngOnInit() {
        this.session.user.subscribe((user: User | null) => {
            this.name = user?.name || '';
            this.lastname = user?.lastname || '';
        })
        
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

    sendClickEvent(buttonName: string) {
        this.click.emit(buttonName);
    }
    async startScanning() {
        // if (button === 'scan' && Capacitor.getPlatform() === 'web')
        //     this.selectedComponent = 'qrwebscanner';
        if (Capacitor.getPlatform() !== 'web')
            console.log(await this.scanner.scan());
    }
}

