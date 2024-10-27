import { Component, EnvironmentInjector, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { bookOutline, exitOutline, home, personCircleOutline } from 'ionicons/icons';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ScannerService } from 'src/app/services/scanner/scanner.service';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss'],
    standalone: true,
    imports: [
      IonTabs, IonTabBar, IonTabButton,
      IonIcon, IonLabel
    ],
})
export class TabsPage {
    public environmentInjector = inject(EnvironmentInjector);
    private readonly auth = inject(AuthService);
    private readonly router = inject(Router);
    private readonly scannerState = inject(ScannerService);

    constructor() {
      addIcons({ home });
      addIcons({ bookOutline });
      addIcons({ personCircleOutline });
      addIcons({ exitOutline });
    }

    logout() {
        this.auth.logout();
        this.router.navigateByUrl('login');
    }

    goHome() {
        this.scannerState.scanning = true
        this.router.navigateByUrl('tabs/home');
    }

    goMyClass() {
        this.router.navigateByUrl('tabs/my-class');
    }

    goMyProfile() {
        this.router.navigateByUrl('tabs/my-profile');
    }
}
