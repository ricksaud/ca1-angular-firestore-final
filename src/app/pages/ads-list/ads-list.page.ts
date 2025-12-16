import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { FilterService } from '../../services/filter.service';
import { Subscription } from 'rxjs';

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  description: string;
  image: string;
  bedrooms: number;
  bathrooms: number;
  type: string; // house, apartment, villa, cottage, etc.
}

@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.page.html',
  styleUrls: ['./ads-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, FormsModule],
})
export class AdsListPage implements OnInit, OnDestroy {
  // 🔍 Search drawer state
  searchOpen = false;
  searchQuery = '';

  // Popular city suggestions
  cities = [
    'Dublin',
    'Cork',
    'Limerick',
    'Galway',
    'Waterford',
    'Belfast',
    'Kilkenny',
  ];

  // 🔥 Filter system
  filtersSub!: Subscription;
  activeFilters: any = null;

  // 📌 Main properties list (now with bedrooms, bathrooms, type)
  sampleProperties: Property[] = [
    {
      id: '1',
      title: 'Luxury Dublin Apartment',
      price: 750000,
      location: 'Dublin',
      description:
        'Modern 3-bedroom apartment in the heart of Dublin with city views.',
      image: 'assets/properties/luxury_dublin_1.jpg',
      bedrooms: 3,
      bathrooms: 2,
      type: 'apartment',
    },
    {
      id: '2',
      title: 'Cozy Cork House',
      price: 325000,
      location: 'Cork',
      description: 'Charming 2-bedroom house in a quiet Cork neighborhood.',
      image: 'assets/properties/cozy_cork_1.jpg',
      bedrooms: 2,
      bathrooms: 1,
      type: 'house',
    },
    {
      id: '3',
      title: 'Modern Limerick Villa',
      price: 600000,
      location: 'Limerick',
      description: 'Spacious 4-bedroom villa with a garden and garage.',
      image: 'assets/properties/modern_limerick_1.jpg',
      bedrooms: 4,
      bathrooms: 3,
      type: 'villa',
    },
    {
      id: '4',
      title: 'Charming Galway Cottage',
      price: 320000,
      location: 'Galway',
      description:
        'Traditional 2-bedroom cottage near the coast with a rustic feel.',
      image: 'assets/properties/galway_cottage_1.jpg',
      bedrooms: 2,
      bathrooms: 1,
      type: 'cottage',
    },
    {
      id: '5',
      title: 'Spacious Belfast Townhouse',
      price: 480000,
      location: 'Belfast',
      description: '3-bedroom townhouse with modern interior and parking.',
      image: 'assets/properties/belfast_townhouse_1.jpg',
      bedrooms: 3,
      bathrooms: 2,
      type: 'house',
    },
    {
      id: '6',
      title: 'Seaside Waterford Home',
      price: 400000,
      location: 'Waterford',
      description:
        '2-bedroom home with amazing sea views and a private terrace.',
      image: 'assets/properties/waterford_home_1.jpg',
      bedrooms: 2,
      bathrooms: 2,
      type: 'house',
    },
    {
      id: '7',
      title: 'Elegant Kilkenny Mansion',
      price: 750000,
      location: 'Kilkenny',
      description: 'Luxury 5-bedroom mansion with garden, pool, and garage.',
      image: 'assets/properties/kilkenny_mansion_1.jpg',
      bedrooms: 5,
      bathrooms: 4,
      type: 'mansion',
    },
  ];

  // 👁 Filtered results
  filteredProperties: Property[] = [];

  constructor(public auth: AuthService, private filterService: FilterService) {}

  // ▶️ Initialize
  ngOnInit() {
    this.filteredProperties = this.sampleProperties;

    // Listen for filter modal output
    this.filtersSub = this.filterService.filters$.subscribe((f) => {
      this.activeFilters = f;
      this.applyAllFilters();
    });
  }

  // 🧹 Cleanup subscription
  ngOnDestroy() {
    if (this.filtersSub) this.filtersSub.unsubscribe();
  }

  // 🔍 Slide drawer
  toggleSearch() {
    this.searchOpen = !this.searchOpen;
  }

  // 🔎 Search input filtering
  applySearchFilter() {
    this.applyAllFilters();
  }

  // 💡 Suggested city
  applySuggestion(city: string) {
    this.searchQuery = city;
    this.applyAllFilters();
    this.searchOpen = false;
  }

  // 🔥 MASTER FILTERING ENGINE
  applyAllFilters() {
    let results = [...this.sampleProperties];

    // 1️⃣ Search text
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();

      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // 2️⃣ Modal filters
    if (this.activeFilters) {
      const f = this.activeFilters;

      // Price
      results = results.filter(
        (p) => p.price >= f.price.lower && p.price <= f.price.upper
      );

      // Bedrooms
      if (f.bedrooms) {
        results = results.filter((p) => p.bedrooms >= Number(f.bedrooms));
      }

      // Bathrooms
      if (f.bathrooms) {
        results = results.filter((p) => p.bathrooms >= Number(f.bathrooms));
      }

      // Type
      if (f.type && f.type !== 'any') {
        results = results.filter(
          (p) => p.type.toLowerCase() === f.type.toLowerCase()
        );
      }
    }

    // Update UI
    this.filteredProperties = results;
  }
}
