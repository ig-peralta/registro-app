import { Component, EnvironmentInjector, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { bookOutline, exitOutline, home, personCircleOutline, chatbubblesOutline } from 'ionicons/icons';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ScannerService } from 'src/app/services/scanner/scanner.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss'],
    standalone: true,
    imports: [
      IonTabs, IonTabBar, IonTabButton,
      IonIcon, IonLabel, TranslateModule
    ],
})
export class TabsPage {
    public environmentInjector = inject(EnvironmentInjector);
    private readonly auth = inject(AuthService);
    private readonly router = inject(Router);
    private readonly scannerState = inject(ScannerService);

    constructor(private translate: TranslateService) {
        addIcons({ home });
        addIcons({ bookOutline });
        addIcons({ personCircleOutline });
        addIcons({ exitOutline });
        addIcons({ chatbubblesOutline });
        const lang = localStorage.getItem('lang') || 'es';
        this.translate.use(lang);
    }

    logout() {
        this.auth.logout();
        this.router.navigateByUrl('login');
    }

    goHome() {
        this.router.navigateByUrl('tabs/home');
    }

    goMyClass() {
        this.router.navigateByUrl('tabs/my-class');
    }

    goMyProfile() {
        this.router.navigateByUrl('tabs/my-profile');
    }

    goForum() {
        this.router.navigateByUrl('tabs/forum');
    }
}
