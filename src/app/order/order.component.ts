import { ChangeDetectorRef, Component } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {

  orderDetails: any[] = [];

  constructor(private productService: ProductsService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadOrder();
  }

  loadOrder(): void {
    this.productService.getOrder().subscribe(
      (data) => {
        this.orderDetails = data;
        this.cd.detectChanges();
      },
      (error) => {
        console.error('Error loading Order:', error);
      }
    );
  }
}