// auth/login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  // styleUrl:'./login.component.css',
  standalone: false
})
export class LoginComponent {
  form: FormGroup;
  message = '';

  constructor(private auth: AuthService, private router: Router, private snackbar: MatSnackBar, private fb: FormBuilder) {
    this.form = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  onSubmit() {
    this.auth.login(this.form.value).subscribe({
      next: (res) => {
        if (this.auth.isAdminLoggedin()) {
          this.router.navigate(['/admin/dashboard']);
        }
        else if (!this.auth.isAdminLoggedin()) {
          this.router.navigate(['/users/dashboard']);
        }

      },
      error: (error) => {
        this.snackbar.open('Login failed. Please try again!', 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });
        this.router.navigate(['/login']);
      }
    });

  }
}
/*  this.snackbar.open('Login successful', 'Close', {
   duration: 5000,
   horizontalPosition: 'center',
   verticalPosition: 'top',
   panelClass: ['success-snackbar'],
 });
 this.router.navigate(['/dashboard']); */