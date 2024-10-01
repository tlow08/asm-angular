import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup ;

  authService = inject(AuthService);
  router = inject(Router);

  constructor() {
    // Initialize the form with validators
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  handleSubmit() {
    if (this.loginForm.invalid) {
      alert("Dien day du thong tin!");
      return;
    }

    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.authService.loginUser(this.loginForm.value).subscribe({
        next: (response) => {
          this.authService.storeToken(response.accessToken),
          alert('Successfully logged in!');
          this.router.navigateByUrl('/'); // Navigate to home or dashboard
        },
        error: (e) => alert('Error: ' + e.message),
      });
    }
  }
}
