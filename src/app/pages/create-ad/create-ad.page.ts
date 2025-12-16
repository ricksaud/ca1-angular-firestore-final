import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.page.html',
  styleUrls: ['./create-ad.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule, // <-- Added this (this is what you needed)
    RouterModule,
  ],
})
export class CreateAdPage {
  adForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private propertyService: PropertyService
  ) {
    this.adForm = this.fb.group({
      title: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      bedrooms: ['', Validators.required],
      bathrooms: ['', Validators.required],
      area: ['', Validators.required],
      description: ['', Validators.required],
      features: [''], // comma-separated features
      images: [''], // comma-separated images
    });
  }

  async submitAd() {
    this.submitted = true;

    if (!this.adForm.valid) {
      alert('Please fill in all required fields.');
      return;
    }

    const adData = { ...this.adForm.value };

    // Convert comma-separated strings to arrays
    adData.features = adData.features
      ? adData.features.split(',').map((f: string) => f.trim())
      : [];

    adData.images = adData.images
      ? adData.images.split(',').map((i: string) => i.trim())
      : [];

    try {
      await this.propertyService.addProperty(adData);
      alert('Property added successfully!');
      this.adForm.reset();
      this.submitted = false;
    } catch (error) {
      console.error(error);
      alert('Error adding property. Please try again.');
    }
  }
}
