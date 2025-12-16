import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { FilterService } from './services/filter.service';

// 🔽 Import the Filters Page
import { FiltersPage } from './pages/filters/filters.page';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  isLoggedIn = false;

  // 🔍 Search panel state
  searchOpen = false;
  searchQuery = '';

  constructor(
    public auth: AuthService,
    private router: Router,
    private modalCtrl: ModalController,
    private filterService: FilterService
  ) {
    // Watch auth changes
    this.auth.currentUser$.subscribe((user) => {
      this.isLoggedIn = !!user;
    });
  }

  // 🏠 Navigate home
  goHome() {
    this.router.navigate(['/ads']);
  }

  // 🔐 Logout
  async logout() {
    await this.auth.logout();
  }

  // 🔍 Toggle search panel
  toggleSearch() {
    this.searchOpen = !this.searchOpen;
  }

  // 🔍 Search input changed
  onSearchChange() {
    console.log('Search query:', this.searchQuery);
  }

  // 🎛️ OPEN FILTERS MODAL (NEW)
  async openFilters() {
    const modal = await this.modalCtrl.create({
      component: FiltersPage,
      breakpoints: [0, 1],
      initialBreakpoint: 1,
      cssClass: 'filters-modal',
    });

    modal.onDidDismiss().then((result) => {
      if (result.data?.filters) {
        this.filterService.applyFilters(result.data.filters);
      }
    });

    await modal.present();
  }
}
