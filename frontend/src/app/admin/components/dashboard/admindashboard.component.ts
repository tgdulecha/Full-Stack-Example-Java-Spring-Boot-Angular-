import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admindashboard',
  standalone: false,
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.css',
}

)

export class AdmindashboardComponent {
  products: any = [];
  searchProductForm: FormGroup;

  constructor(private router: Router, private snackbar: MatSnackBar, private fb: FormBuilder, private auth: AdminService) {
    this.searchProductForm = this.fb.group({
      title: ['', [Validators.required]],

    }); this.getAllProducts();

  }
  getAllProducts() {
    this.products = [];
    this.auth.getAllProducts().subscribe(
      {
        next: (res) => {
          res.forEach((element: { procesImg: string; byteImg: string; }) => {
            element.procesImg = 'data:image/jpeg;base64,' + element.byteImg;
            this.products.push(element);

          });
          //this.router.navigate(['admin/dashboard'])
        },
        error: (error) => {
          this.snackbar.open('nothing found. Please try again!', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
          });
          this.router.navigate(['admin/product']);
        }
      });
  }
  submitForm() {
    this.products = [];
    const title = this.searchProductForm.get('title')?.value;
    this.auth.getAllProductsByName(title).subscribe(
      {
        next: (res) => {
          res.forEach((element: { procesImg: string; byteImg: string; }) => {
            element.procesImg = 'data:image/jpeg;base64,' + element.byteImg;
            this.products.push(element);

          });
        },
        error: (error) => {
          this.snackbar.open('nothing found. Please try again!', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
          });
          // this.router.navigate(['/admin/product']);
        }
      });

  }

  deleteProduct(productId: any) {
    this.auth.deleteProduct(productId).subscribe(
      {
        next: () => {
          this.snackbar.open('Deleted successfull', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['success-snackbar'],
          });
          this.getAllProducts();


        },
        error: (error) => {
          this.snackbar.open('Delete failed: ' + error.message, 'Close', { duration: 3000 });

          this.snackbar.open('nothing found. Please try again!', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
          });
        }
      });

  }



}
