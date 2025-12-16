import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-book-viewing',
  templateUrl: './book-viewing.page.html',
  styleUrls: ['./book-viewing.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, RouterModule],
})
export class BookViewingPage {
  property: any = null; // Property details
  propertyId: string | null = null;
  bookingForm: FormGroup;
  bookingFormSubmitted = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private bookingService: BookingService,
    private alertCtrl: AlertController
  ) {
    this.propertyId = this.route.snapshot.paramMap.get('id');

    // Initialize reactive form
    this.bookingForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      dateTime: ['', Validators.required], // <-- Single datetime field
      notes: [''],
    });

    // Pre-fill property data from router state
    const stateProperty = history.state.propertyData;
    if (stateProperty) {
      this.property = stateProperty;

      if (stateProperty.userName)
        this.bookingForm.patchValue({ name: stateProperty.userName });
      if (stateProperty.userEmail)
        this.bookingForm.patchValue({ email: stateProperty.userEmail });
      if (stateProperty.userPhone)
        this.bookingForm.patchValue({ phone: stateProperty.userPhone });
    }
  }

  async submitBooking() {
    if (this.bookingForm.valid && this.propertyId) {
      try {
        await this.bookingService.bookViewing({
          propertyId: this.propertyId,
          propertyTitle: this.property?.title || '',
          propertyLocation: this.property?.location || '',
          ...this.bookingForm.value,
          createdAt: new Date(),
        });

        this.bookingForm.reset();

        const alert = await this.alertCtrl.create({
          header: 'Viewing Booked!',
          message: 'Your property viewing has been scheduled successfully.',
          buttons: [
            {
              text: 'OK',
              handler: () => {
                // Redirect to properties page
                window.location.href = '/ads';
              },
            },
          ],
        });

        await alert.present();
      } catch (error) {
        console.error('Error booking viewing:', error);

        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: 'Something went wrong while booking your viewing.',
          buttons: ['OK'],
        });

        await alert.present();
      }
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Missing Fields',
        message: 'Please fill in all required fields.',
        buttons: ['OK'],
      });

      await alert.present();
    }
  }
}
