import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:3000/product'; 

  constructor(private http: HttpClient) {}

 
  getAllProducts(): Observable<any> {
    return this.http.get('http://localhost:3000/product');
  }

  getProductById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url);
  }


  updateProduct(id: number, user: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, user);
  }

  deleteProduct(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
