import { Component, OnInit, inject, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SessionService } from 'src/app/services/session/session.service';
import { AnimationController } from '@ionic/angular/standalone';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonSpinner } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { ScannerComponent } from './scanner/scanner.component';
import { ScannerService } from 'src/app/services/scanner/scanner.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    ScannerComponent, CommonModule, IonHeader,
    IonToolbar, IonTitle, IonContent,
    IonCard, IonSpinner
  ]
})

export class HomePage implements OnInit {
    session = inject(SessionService);
    auth = inject(AuthService);
    router = inject(Router);
    nav = inject(NavigationService);
    scanner = inject(ScannerService);

    @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;

    name: string = '';
    lastname: string = '';
    scannerLoading: boolean = true


    constructor(private animationController: AnimationController) { }

    ngOnInit() {
        this.session.user.subscribe((user: User | null) => {
            this.name = user?.name || '';
            this.lastname = user?.lastname || '';
        })
        this.scanner.loading.subscribe(state => this.scannerLoading = state);
        // this.getStateData();
    }
    ngAfterViewInit() {
        this.animateTitle();
    }
    // we did this to prove that we can get the data from the state
    getStateData() {
        const user = this.nav.getState()['user'];
        const name = user?.name || '';
        const lastname = user?.lastname || '';
        console.log('data from state', name, lastname);
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
}

