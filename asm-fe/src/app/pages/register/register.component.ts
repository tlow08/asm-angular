import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']  // Corrected to styleUrls
})
export class RegisterComponent {
  registerForm: FormGroup;  // Fixed typo from registerFrom to registerForm

  authService = inject(AuthService);
  router = inject(Router);

  constructor() {
    // Initialize the form with validators
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  handleSubmit() {
    if (this.registerForm.invalid) {
      alert("Dien day du thong tin!");
      return;
    }

    console.log(this.registerForm.value);
    this.authService.registerUSer(this.registerForm.value).subscribe({
      next: () => {
        alert("Successfully registered!");
        this.router.navigateByUrl('/login');
      },
      error: (e) => alert('Error: ' + e.message),
    });
  }
}
