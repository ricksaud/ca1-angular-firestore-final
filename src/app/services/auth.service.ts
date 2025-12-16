import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  User,
} from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Holds the current user
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  // Observable for components to subscribe
  currentUser$ = this.currentUserSubject.asObservable();

  // Alias like AngularFireAuth.user$
  user$: Observable<User | null> = this.currentUser$;

  constructor(private auth: Auth, private firestore: Firestore) {
    // Listen for authentication changes
    onAuthStateChanged(this.auth, (user) => {
      this.currentUserSubject.next(user);
    });
  }

  // -------------------------------------------------
  // REGISTER USER + SAVE EXTRA DATA IN FIRESTORE
  // -------------------------------------------------
  async register(name: string, email: string, password: string, phone: string) {
    const userCredential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    const user = userCredential.user;

    // Save additional user information in Firestore
    await setDoc(doc(this.firestore, `users/${user.uid}`), {
      uid: user.uid,
      name,
      email,
      phone,
      createdAt: new Date(),
    });

    return user;
  }

  // -------------------------------------------------
  // LOGIN
  // -------------------------------------------------
  async login(email: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  // -------------------------------------------------
  // LOGOUT
  // -------------------------------------------------
  async logout() {
    return await signOut(this.auth);
  }

  // -------------------------------------------------
  // RESET PASSWORD
  // -------------------------------------------------
  async resetPassword(email: string) {
    return await sendPasswordResetEmail(this.auth, email);
  }

  // -------------------------------------------------
  // GET USER FIRESTORE DATA
  // -------------------------------------------------
  async getUserData(uid: string) {
    const ref = doc(this.firestore, `users/${uid}`);
    const snap = await getDoc(ref);
    return snap.exists() ? snap.data() : null;
  }

  // -------------------------------------------------
  // HELPER: CHECK IF LOGGED IN
  // -------------------------------------------------
  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  // -------------------------------------------------
  // HELPER: RAW ACCESS TO FIREBASE'S onAuthStateChanged
  // -------------------------------------------------
  onAuthStateChanged(callback: (user: User | null) => void) {
    return onAuthStateChanged(this.auth, callback);
  }

  // -------------------------------------------------
  // GET CURRENT USER (SYNCHRONOUS)
  // -------------------------------------------------
  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
