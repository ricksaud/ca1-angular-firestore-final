import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ProfilePage {
  user: any = {};

  constructor(
    public auth: AuthService, // <-- change private → public
    private firestore: Firestore
  ) {
    this.auth.currentUser$.subscribe(async (user) => {
      if (user) {
        const ref = doc(this.firestore, `users/${user.uid}`);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          this.user = snap.data();
        }
      }
    });
  }

  async updateProfile() {
    const currentUser = this.auth.currentUser;
    if (currentUser) {
      const ref = doc(this.firestore, `users/${currentUser.uid}`);
      await updateDoc(ref, this.user);
      alert('Profile updated successfully!');
    }
  }
}
