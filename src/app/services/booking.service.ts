// src/app/services/booking.service.ts
import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root', // makes it available app-wide
})
export class BookingService {
  constructor(private firestore: Firestore) {}

  async bookViewing(booking: any) {
    const bookingsRef = collection(this.firestore, 'viewings');
    return await addDoc(bookingsRef, booking);
  }
}
