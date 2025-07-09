import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-post-category',
  standalone: false,
  templateUrl: './post-category.component.html',
  styleUrl: './post-category.component.css'
})
export class PostCategoryComponent {
  categoryform: FormGroup;
  message = '';

  constructor(private auth: AdminService, private router: Router, private snackbar: MatSnackBar, private fb: FormBuilder) {
    this.categoryform = this.fb.group({
      name: [''],
      description: ['']
    });
  }

  addCategory() {
    this.auth.addCategory(this.categoryform.value).subscribe({
      next: (res) => {
        if (res.id != null) {
          this.snackbar.open('Category added successfuly', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['success-snackbar'],
          });
          this.router.navigate(['admin/category']);
        }
        else{
            this.snackbar.open(res.message, 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'error-snackbar'
          });
        }

      },
      error: (error) => {
        this.snackbar.open('fails to add category. Try again!', 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });
        this.router.navigate(['admin/dashboard']);
      }
    });

  }

}
