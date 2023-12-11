import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  constructor(private route: ActivatedRoute,private productsService: ProductsService,private toastr: ToastrService) { }
  products: any[] = [];
  productId: number=0;
  selectedProduct: any; 
  selectProductIndex: number = 0; 
  orderDetails={
    id:undefined,
    product:[],
    total:0  ,
    createdDate:"",
  };
  
  ngOnInit(): void {
   
    this.route.params.subscribe(params => {
      this.productId = +params['id']; 
      this.getbyid(this.productId);
      
    });
  }
  getbyid(id:number){
    this.productsService.getProductById(id).subscribe(
      (data) => {
        this.selectedProduct=data;
        
        
        console.log('selectedProduct:', this.selectedProduct);
      },
      (error) => {
        console.error('Error loading selectedProduct:', error);
      }
    );
  }
 

  changeIndex(index: number): void {
    this.selectProductIndex = index;
  }

  buyProduct(productId: number): void {
    const currentDate = new Date();

    const orderDetails = {
      product:[this.selectedProduct],
      total: this.selectedProduct.productAmount,
      createdDate: currentDate.toISOString() 
      
    };

    this.productsService.addToOrder(orderDetails).subscribe(
      (response) => {
        this.toastr.success('success',`Product with ID ${this.selectedProduct.id} added to the Order`);
        console.log('Order placed successfully:', response);
      
      },
      (error) => {
        this.toastr.error('Error adding product to the Order:"',error)
        console.error('Error placing order:', error);
      }
    );
  }

  addToCart(productId: number): void {
    const cartItem = {
      product: this.selectedProduct,
      quantity: 1, 
    };

    this.productsService.addToCart(cartItem).subscribe(
      (data) => {
        this.toastr.success('success',`Product with ID ${this.selectedProduct.id} added to the cart`);
        console.log(`Product with ID ${productId} added to the cart.`, data);
      },
      (error) => {
        this.toastr.error('Error adding product to the cart:"',error)
        console.error('Error adding product to the cart:', error);
      }
    );
  }
}
