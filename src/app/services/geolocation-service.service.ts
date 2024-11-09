import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Geolocation, Position, PermissionStatus } from '@capacitor/geolocation';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  constructor(private platform: Platform, private http: HttpClient) {}

  async checkPermissions(): Promise<boolean> {
    if (this.platform.is('capacitor')) {
      const status = await Geolocation.checkPermissions();
      return status.location === 'granted';
    } else {
      return new Promise((resolve) => {
        if (!('permissions' in navigator)) {
          resolve(true); // Si no hay API de permisos, asumimos que está permitido
          return;
        }
        
        navigator.permissions.query({ name: 'geolocation' })
          .then(result => {
            resolve(result.state === 'granted');
          })
          .catch(() => {
            resolve(false);
          });
      });
    }
  }

  async requestPermissions(): Promise<boolean> {
    try {
      if (this.platform.is('capacitor')) {
        const status = await Geolocation.requestPermissions();
        return status.location === 'granted';
      } else {
        // En web, la solicitud de permisos se maneja automáticamente al llamar a getCurrentPosition
        return true;
      }
    } catch (error) {
      console.error('Error requesting permissions:', error);
      return false;
    }
  }

  async getCurrentPosition(): Promise<{ lat: number; lng: number } | null> {
    try {
      const hasPermission = await this.checkPermissions();
      
      if (!hasPermission) {
        const granted = await this.requestPermissions();
        if (!granted) {
          console.log('Permisos de ubicación denegados');
          return null;
        }
      }

      if (this.platform.is('capacitor')) {
        console.log('Calculando posición con el dispositivo móvil');
        const position: Position = await Geolocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        });
        
        return {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      } 

      if (this.platform.is('desktop') || this.platform.is('pwa')) {
        return new Promise((resolve, reject) => {
          if ('geolocation' in navigator) {
            console.log('Calculando posición con el navegador');
            navigator.geolocation.getCurrentPosition(
              (position) => {
                resolve({
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                });
              },
              (error) => {
                console.error('Error de geolocalización:', error);
                reject(error);
              },
              {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
              }
            );
          } else {
            reject('Geolocalización no está soportada en este navegador.');
          }
        });
      }

      return null;
    } catch (error) {
      console.error('Error obteniendo la posición:', error);
      return null;
    }
  }
  getPlaceFromCoordinates(lat: number, lng: number): Observable<any> {
    const apiUrl = 'https://nominatim.openstreetmap.org/reverse';
    const url = `${apiUrl}?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;

    https://nominatim.openstreetmap.org/reverse?format=json&lat=-33.5406215&lon=-70.5578871&zoom=18&addressdetails=1

    return this.http.get(url);
  }

}
