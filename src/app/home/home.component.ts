import { HttpClient } from '@angular/common/http';
import { Component,ChangeDetectorRef, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls:[ './home.component.css'
]})
export class HomeComponent implements OnInit {
  products: any[] = [];
  selectedProduct: any;

  constructor(private productsService: ProductsService, private cd:ChangeDetectorRef) {}

  ngOnInit() {
    this.loadProducts();
  }
  showProductDetails(product: any): void {
    this.selectedProduct = product;
  }
  loadProducts() {
    this.productsService.getAllProducts().subscribe(
      (data) => {
        this.products = data; 
        this.cd.detectChanges();
        console.log('products:', this.products);
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
  }
}
