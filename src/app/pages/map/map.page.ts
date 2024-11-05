import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonButton, IonFooter, IonIcon } from '@ionic/angular/standalone';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { logoTwitter, logoInstagram, logoLinkedin } from "ionicons/icons";
import { GeolocationService } from 'src/app/services/geolocation-service.service';
import * as L from 'leaflet'; // Importamos Leaflet
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton, IonButtons, IonButton, TranslateModule, IonFooter, IonIcon]
})
export class MapPage implements OnInit {
  map: L.Map | null = null;
  addressName: string = '';
  distance: string = '';

  constructor(private translate: TranslateService, private geo: GeolocationService, private http: HttpClient) {
    addIcons({ logoTwitter, logoInstagram, logoLinkedin });
    const lang = localStorage.getItem('lang') || 'es';
    this.translate.use(lang);
  }

  ngOnInit() {
    this.loadMap();
    this.fixLeafletIconPath();
  }

  async loadMap() {
    await this.geo.getCurrentPosition().then((position: { lat: number, lng: number } | null) => {
      if (position) {
        // Configuramos el centro del mapa y el nivel de zoom
        this.map = L.map('mapId').setView([position.lat, position.lng], 15);

        // Cargamos el mapa de OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);

        // Ir a mi ubicación
        this.goToMyPosition();
      } else {
        console.log('Posición geográfica desconocida');
      }
    }).catch((error) => {
      console.log('Error al obtener la posición geográfica');
    });
  }

  goToDUOC() {
    this.goToPosition(-33.44703, -70.65762, 15, 'Instituto DUOC Padre Alonso de Ovalle');
  }

  async goToMyPosition() {
    this.geo.getCurrentPosition().then((position: { lat: number, lng: number } | null) => {
      if (position) {
        this.goToPosition(position.lat, position.lng, 15, 'Mi ubicación');
      }
    });
  }

  goToPosition(lat: number, lng: number, zoom: number, popupText: string) {
    if (this.map) {
      // Centrar el mapa en la ubicación especificada
      this.map.setView([lat, lng], zoom);

      // Agregar un marcador en las coordenadas
      const marker = L.marker([lat, lng]).addTo(this.map);
      marker.bindPopup(popupText).openPopup();
    }
  }

  async getMyAddress(lat: number, lng: number) {
    this.geo.getPlaceFromCoordinates(lat, lng).subscribe({
      next: (value: any) => {
        this.addressName = value.display_name;
      },
      error: (error: any) => {
        console.log(error);
        this.addressName = '';
      }
    });
  }

  showRouteToDuoc() {
    this.geo.getCurrentPosition().then((position: { lat: number, lng: number } | null) => {
      if (position) {
        this.goToPosition(position.lat, position.lng, 15, 'Mi ubicación');
        this.getRoute({ lat: position.lat, lng: position.lng }, { lat: -33.44703, lng: -70.65762 }, "walking");
      }
    });
  }

  getRoute(start: { lat: number, lng: number }, end: { lat: number, lng: number }, mode: 'driving' | 'walking') {
    // URL de la API de OSRM para obtener la ruta
    const url = `https://router.project-osrm.org/route/v1/${mode}/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`;
    console.log(url);

    // Realizamos una solicitud HTTP para obtener la ruta
    this.http.get(url).subscribe((response: any) => {
      if (this.map) {
        const routeCoords = response.routes[0].geometry.coordinates;

        // Convertimos las coordenadas de la ruta en formato Leaflet
        const routeLatLngs = routeCoords.map((coord: [number, number]) => [coord[1], coord[0]]);

        // Dibujamos la línea de la ruta en el mapa
        const routeLine = L.polyline(routeLatLngs, { color: 'blue', weight: 5 }).addTo(this.map);

        // Ajustamos el mapa para que la ruta sea visible en la pantalla
        this.map.fitBounds(routeLine.getBounds());

        // Extraer la distancia y la duración de la respuesta
        const distance = response.routes[0].distance / 1000; // Distancia en kilómetros
        const duration = response.routes[0].duration / 60;   // Duración en minutos

        this.distance = `Distancia: ${distance.toFixed(2)} km , Estimado: ${duration.toFixed(2)} minutos`;
      }
    });
  }

  fixLeafletIconPath() {
    // Sobrescribimos las rutas de los iconos de Leaflet
    const iconDefault = L.icon({
      iconUrl: 'assets/leaflet/images/marker-icon.png',
      shadowUrl: 'assets/leaflet/images/marker-shadow.png',
    });
    
    L.Marker.prototype.options.icon = iconDefault;
  }
}
