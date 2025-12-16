import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonicModule,
  AlertController,
  LoadingController,
} from '@ionic/angular';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, RouterModule],
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  // ---------------------------------------------------
  // LOGIN FUNCTION (updated with your ion-alert version)
  // ---------------------------------------------------
  async login() {
    if (!this.loginForm.valid) return;

    const { email, password } = this.loginForm.value;

    try {
      // Authenticate user
      await this.authService.login(email, password);

      // SUCCESS ALERT (inline ion-alert)
      const alert = document.createElement('ion-alert');
      alert.header = 'Success!';
      alert.message = 'You have logged in successfully.';
      alert.buttons = ['OK'];

      document.body.appendChild(alert);
      await alert.present();

      // Redirect ONLY after user closes the alert
      alert.onDidDismiss().then(() => {
        this.router.navigate(['/ads']);
      });
    } catch (error: any) {
      console.error(error);

      // ERROR ALERT (inline ion-alert)
      const alert = document.createElement('ion-alert');
      alert.header = 'Login Failed';
      alert.message = error.message || 'Something went wrong.';
      alert.buttons = ['OK'];

      document.body.appendChild(alert);
      await alert.present();
    }
  }

  // ---------------------------------------------------
  // PASSWORD RESET
  // ---------------------------------------------------
  async resetPassword() {
    const email = this.loginForm.value.email;

    if (!email) {
      this.showAlert(
        'Missing Email',
        'Please enter your email to reset your password.'
      );
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Sending reset email...',
    });
    await loading.present();

    try {
      await this.authService.resetPassword(email);
      await loading.dismiss();

      this.showAlert('Email Sent', 'Check your inbox to reset your password.');
    } catch (error: any) {
      await loading.dismiss();
      this.showAlert('Error', error.message || 'Failed to send reset email.');
    }
  }

  // ---------------------------------------------------
  // ALERT HELPER
  // ---------------------------------------------------
  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
