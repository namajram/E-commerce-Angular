
import { Component,ChangeDetectorRef, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartDetails: any[] = [];

  constructor(private productService: ProductsService,private cd:ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.productService.getCartItems().subscribe(
      (data) => {
        this.cartDetails = data;
        this.cd.detectChanges();
      },
      (error) => {
        console.error('Error loading cart items:', error);
      }
    );
  }

  delete(cartItemId: number): void {
    this.productService.removeFromCart(cartItemId).subscribe(
      () => {
       
        this.loadCartItems();
      },
      (error) => {
        console.error('Error deleting cart item:', error);
      }
    );
  }

  checkout(): void {
    
    console.log('Checkout clicked');
  }
}