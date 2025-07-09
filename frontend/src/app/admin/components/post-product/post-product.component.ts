import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';
@Component({
  selector: 'app-post-product',
  standalone: false,
  templateUrl: './post-product.component.html',
  styleUrl: './post-product.component.css'
})
export class PostProductComponent {
  productForm: FormGroup;
  listcategories: any = [];
  imagePreview!: string | ArrayBuffer | null;
  selectedFile!: File;


  constructor(private auth: AdminService, private router: Router, private snackbar: MatSnackBar, private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
    this.getAllCategories();
  }

  getAllCategories() {
    this.auth.getAllCategories().subscribe(
      {
        next: (res) => {
          this.listcategories = res;
        },
        error: (error) => {
          this.snackbar.open('nothing found. Please try again!', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
          });
          this.router.navigate(['/admin/product']);
        }
      });
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }
  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);

  }

  addProduct(): void {
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('img', this.selectedFile);
      formData.append('name', this.productForm.get('name')?.value);
      formData.append('description', this.productForm.get('description')?.value);
      formData.append('price', this.productForm.get('price')?.value);
      formData.append('categoryId', this.productForm.get('category')?.value);
      this.auth.addProduct(formData).subscribe({
        next: (res) => {
          this.snackbar.open('Product added successfully', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['success-snackbar'],
          });
          this.router.navigate(['admin/dashboard']);
        },
        error: (err) => {
          this.snackbar.open('Failed to add product. Try again!', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
          });
        }
      });


    }
    else {

    }


  }



}
