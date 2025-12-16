import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { register } from 'swiper/element/bundle';
register();

// Firebase imports
import { initializeApp } from 'firebase/app';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth'; // <-- NEW

// Direct Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBNGk95ID3PE3wZczJG8rEJy8nKuW7ZDSo',
  authDomain: 'propertyapp-d3820.firebaseapp.com',
  projectId: 'propertyapp-d3820',
  storageBucket: 'propertyapp-d3820.firebasestorage.app',
  messagingSenderId: '7448281486',
  appId: '1:7448281486:web:ebf5d6ed064439452464df',
};

bootstrapApplication(AppComponent, {
  providers: [
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    // Firebase initialization with direct config
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()), // <-- ADDED Auth provider
    provideFirestore(() => getFirestore()),
  ],
});
