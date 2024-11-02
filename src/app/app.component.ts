import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    IonApp, 
    IonRouterOutlet,
    TranslateModule
  ],
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    // El idioma por defecto ya está configurado en el main.ts como 'es'
    translate.use('es'); // Puedes cambiar 'es' por el idioma que necesites
  }
}