import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ViewWillEnter, ViewWillLeave } from '@ionic/angular/standalone';
import { Class } from 'src/app/_utils/interfaces/class.interface';
import { ClassService } from 'src/app/services/class/class.service';
import { IonButton, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonRow, IonSpinner, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { ScannerComponent } from '../home/scanner/scanner.component';
import { addIcons } from "ionicons";
import { qrCodeOutline } from "ionicons/icons";
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-my-class',
    templateUrl: './my-class.page.html',
    styleUrls: ['./my-class.page.scss'],
    standalone: true,
    imports: [
      CommonModule,IonIcon,IonButton,
      IonTitle,IonCard,IonLabel,
      IonCol,IonRow,IonGrid,
      IonHeader,IonContent,IonToolbar,
      ScannerComponent,IonSpinner,IonHeader,
      IonToolbar,IonTitle,IonContent,
      IonCard,IonGrid,IonRow,
      IonCol,IonLabel,IonButton,
      IonIcon, TranslateModule
    ],
    animations: [
        trigger('pageAnimation', [
            transition('* => animate', [
                query('.animate-item', [
                    style({ opacity: 0, transform: 'translateY(50px)' }),
                    stagger(100, [
                        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
                    ])
                ], { optional: true })
            ])
        ]),
    ]
})
export class MyClassPage implements OnInit, ViewWillEnter, ViewWillLeave {
    private readonly router = inject(Router);
    private readonly classService = inject(ClassService);

    class: Class | null = null;
    animateState = '';

    ngOnInit(): void {
        this.classService.class.subscribe((value: Class | null) => {
            if (value) {
                this.class = value;
            }
        });
        this.animateState = 'animate';
    }

    ionViewWillEnter(): void {
        this.animateState = 'animate';
    }

    ionViewWillLeave(): void {
        this.animateState = '';
    }

    goToHome(): void {
        this.router.navigateByUrl('/tabs/home');
    }

    constructor(private translate: TranslateService) {
        addIcons({ qrCodeOutline });
        const lang = localStorage.getItem('lang') || 'es';
        this.translate.use(lang);
    }
}
