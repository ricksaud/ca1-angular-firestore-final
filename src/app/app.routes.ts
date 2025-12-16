import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'ads', pathMatch: 'full' },

  // Public pages
  {
    path: 'ads',
    loadComponent: () =>
      import('./pages/ads-list/ads-list.page').then((m) => m.AdsListPage),
  },
  {
    path: 'ad/:id',
    loadComponent: () =>
      import('./pages/ad-detail/ad-detail.page').then((m) => m.AdDetailPage),
  },

  // Book viewing - protected
  {
    path: 'book-viewing/:id',
    loadComponent: () =>
      import('./pages/book-viewing/book-viewing.page').then(
        (m) => m.BookViewingPage
      ),
    canActivate: [AuthGuard],
  },

  // Auth pages (public)
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.page').then((m) => m.RegisterPage),
  },

  // Protected pages
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.page').then((m) => m.ProfilePage),
    canActivate: [AuthGuard],
  },
  {
    path: 'create-ad',
    loadComponent: () =>
      import('./pages/create-ad/create-ad.page').then((m) => m.CreateAdPage),
    canActivate: [AuthGuard],
  },

  {
    path: 'map-view',
    loadComponent: () =>
      import('./pages/map-view/map-view.page').then((m) => m.MapViewPage),
  },
];
