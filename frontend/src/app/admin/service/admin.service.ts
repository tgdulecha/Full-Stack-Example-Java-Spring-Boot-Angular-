import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/* interface CategoryDto {
  name: string;
  description: string;

} */
@Injectable({
  providedIn: 'root'
})

export class AdminService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {

  }
  addCategory(CategoryDto: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/category`, CategoryDto, { headers: this.createAuthorizationHeader() });
  }
  getAllCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/categories`, { headers: this.createAuthorizationHeader() });
  }
  addProduct(ProductDto: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/add_product`, ProductDto, { headers: this.createAuthorizationHeader() });
  }
   updateProduct(productId: any, productDto: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/product/${productId}`, productDto, { headers: this.createAuthorizationHeader() });
  }
  deleteProduct(productId: any): Observable<any> {
    return this.http.delete(this.baseUrl + `/admin/deleteProduct/${productId}`, { headers: this.createAuthorizationHeader() });
  }
  getAllProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/products`, { headers: this.createAuthorizationHeader() });
  }
  getAllProductsByName(name: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/search/${name}`, { headers: this.createAuthorizationHeader() });
  }
  getProductById(productId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/product/${productId}`, { headers: this.createAuthorizationHeader() });
  }
  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('auth_token'))
  }


}
/*     const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); */