import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.page.html',
  styleUrls: ['./filters.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FiltersPage {
  filters = {
    price: { lower: 0, upper: 1000000 },
    bedrooms: '1',
    bathrooms: '1',
    type: 'any',
  };

  constructor(private modalCtrl: ModalController) {}

  close() {
    this.modalCtrl.dismiss();
  }

  apply() {
    this.modalCtrl.dismiss({ filters: this.filters });
  }

  reset() {
    this.filters = {
      price: { lower: 0, upper: 1000000 },
      bedrooms: '1',
      bathrooms: '1',
      type: 'any',
    };
  }
}
