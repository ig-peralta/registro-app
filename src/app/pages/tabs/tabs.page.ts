import { Component, EnvironmentInjector, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { bookOutline, exitOutline, home, personCircleOutline, chatbubblesOutline, personRemoveOutline } from 'ionicons/icons';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ScannerService } from 'src/app/services/scanner/scanner.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { SessionService } from 'src/app/services/session/session.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss'],
    standalone: true,
    imports: [
      IonTabs, IonTabBar, IonTabButton,
      IonIcon, IonLabel, TranslateModule, CommonModule
    ],
})
export class TabsPage implements OnInit {
    public environmentInjector = inject(EnvironmentInjector);
    private readonly auth = inject(AuthService);
    private readonly router = inject(Router);
    private readonly scanner = inject(ScannerService);
    private readonly session = inject(SessionService);

    isAdmin: boolean = false;
    scanning = false;

    constructor(private translate: TranslateService) {
        addIcons({ home });
        addIcons({ bookOutline });
        addIcons({ personCircleOutline });
        addIcons({ exitOutline });
        addIcons({ chatbubblesOutline });
        addIcons({ personRemoveOutline });
        const lang = localStorage.getItem('lang') || 'es';
        this.translate.use(lang);
    }

    ngOnInit() {
      this.session.user.subscribe(user => {
        if (user && user.isAdmin === 1)
          this.isAdmin = true;
        else
          this.isAdmin = false;
      });
      this.scanner.scanning.subscribe(scanning => this.scanning = scanning);
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

    goUsers() {
      this.router.navigateByUrl('tabs/users');
    }

    goForum() {
        this.router.navigateByUrl('tabs/forum');
    }
}
