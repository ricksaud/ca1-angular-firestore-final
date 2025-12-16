import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  constructor(private firestore: Firestore) {}

  async addProperty(adData: any) {
    const adsCollection = collection(this.firestore, 'properties');
    return await addDoc(adsCollection, adData);
  }

  getProperties() {
    const adsCollection = collection(this.firestore, 'properties');
    return collectionData(adsCollection, { idField: 'id' });
  }
}
