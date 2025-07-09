// auth/signup.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'
@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  standalone: false
})
export class SignupComponent {
  signupform: FormGroup;
  message = '';

  constructor(private auth: AuthService, private router: Router, private fb: FormBuilder, private snackbar: MatSnackBar) {
    this.signupform = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmpassword: ['',[Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    const password = this.signupform.get('password')?.value;
    const confirmpassword = this.signupform.get('confirmpassword')?.value;

    if (password !== confirmpassword) {
      this.snackbar.open('Password do not match. Please try again!', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['error-snackbar'],
      });
      return;
    }

    this.auth.signup(this.signupform.value).subscribe({
      next: (res) => {
        this.snackbar.open('Sign up successful!', 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['success-snackbar'],
        });
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.snackbar.open('Sign up failed!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });
        this.router.navigate(['/signup']);
      }
    });

  }
}

/*  onSubmit() {
    this.auth.signup(this.form.value).subscribe(
      {
      
      next: () =>
         this.router.navigate(['/login']),
      error: err => this.message = err.error.message || 'Signup failed'
    });
  } */