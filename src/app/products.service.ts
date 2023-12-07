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

 
    addToCart(cartItem: any): Observable<any> {
    return this.http.post('http://localhost:3000/cart', cartItem);
  }

  
  getCartItems(): Observable<any> {
    return this.http.get('http://localhost:3000/cart');
  }

  
  removeFromCart(cartItemId: number): Observable<any> {
    const url = `http://localhost:3000/cart/${cartItemId}`;
    return this.http.delete(url);
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
