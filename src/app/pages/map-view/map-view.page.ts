import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';
import { GOOGLE_MAPS_API_KEY } from '../../../environments/google-maps';

@Component({
  selector: 'app-map-view',
  standalone: true,
  templateUrl: './map-view.page.html',
  styleUrls: ['./map-view.page.scss'],
  imports: [CommonModule, IonicModule, RouterModule],
})
export class MapViewPage implements AfterViewInit {
  map: any;

  properties = [
    { id: '1', title: 'Luxury Dublin Apartment', lat: 53.345, lng: -6.238 },
    { id: '2', title: 'Cozy Cork Home', lat: 51.898, lng: -8.475 },
    { id: '3', title: 'Limerick House', lat: 52.663, lng: -8.626 },
  ];

  constructor(private router: Router) {}

  async ngAfterViewInit() {
    const loader = new Loader({
      apiKey: GOOGLE_MAPS_API_KEY,
      version: 'weekly',
    });

    await loader.load(); // <-- WORKS on loader 1.16.6

    this.map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        center: { lat: 53.3498, lng: -6.2603 },
        zoom: 7,
      }
    );

    this.addMarkers();
  }

  addMarkers() {
    this.properties.forEach((p) => {
      const marker = new google.maps.Marker({
        position: { lat: p.lat, lng: p.lng },
        map: this.map,
        title: p.title,
      });

      marker.addListener('click', () => {
        this.router.navigate(['/ad', p.id]);
      });
    });
  }
}
