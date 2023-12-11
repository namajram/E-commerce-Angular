
import { Component,ChangeDetectorRef, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartDetails: any[] = [];
orderDetails={
  id:undefined,
  product:[],
  total:0  ,
  createdDate:"",
};
  constructor(private productService: ProductsService,private cd:ChangeDetectorRef,private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.productService.getCartItems().subscribe(
      (data) => {
        this.cartDetails = data;
        this.calculateTotal();
        this.cd.detectChanges();
      },
      (error) => {
        console.error('Error loading cart items:', error);
      }
    );
  }

  delete(cartItemId: number): void {
    this.productService.removeFromCart(cartItemId).subscribe(
      (response) => {       
        this.loadCartItems();
        this.toastr.success('success',`Item delete successfully`);
      },
      (error) => {
        this.toastr.error('Error deleting cart item:"',error)
        console.error('Error deleting cart item:', error);
      }
    );
  }

  checkout(): void {
    const currentDate = new Date();

    const orderDetails = {
      product: this.cartDetails.map((item) => item.product),
      total: this.orderDetails.total,
      createdDate: currentDate.toISOString() 
      
    };

    this.productService.addToOrder(orderDetails).subscribe(
      (response) => {
        this.toastr.success('success',`Your cart successfully checkout to the Order`);
        console.log('Order placed successfully:', response);
        this.deleteCarts(this.cartDetails);
        this.cartDetails = [];
      },
      (error) => {
        this.toastr.error('Error get for cart to the checkout:"',error)
        console.error('Error placing order:', error);
      }
    );
  }

  calculateTotal(): void {
    this.orderDetails.total = this.cartDetails.reduce((total, item) => total + item.product.productAmount, 0);
  }

  deleteCarts(cartDetails: any[]): void {
    cartDetails.forEach((item) => this.delete(item.id));
  }
}