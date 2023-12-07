import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  constructor(private route: ActivatedRoute,private productsService: ProductsService) { }
  products: any[] = [];
  productId: number=0;
  selectedProduct: any; 
  selectProductIndex: number = 0; 
  
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
    
    console.log(`Buying product with ID: ${productId}`);
  }

  addToCart(productId: number): void {
    const cartItem = {
      product: this.selectedProduct,
      quantity: 1, 
    };

    this.productsService.addToCart(cartItem).subscribe(
      (data) => {
        console.log(`Product with ID ${productId} added to the cart.`, data);
      },
      (error) => {
        console.error('Error adding product to the cart:', error);
      }
    );
  }
}
