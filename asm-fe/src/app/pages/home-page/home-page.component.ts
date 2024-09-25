import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { NgFor, NgIf } from '@angular/common'; // Import NgIf here
import { RouterLink } from '@angular/router';

export type Product = {
  _id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  brand: string;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink], // Include NgIf here
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  products: Product[] = [];
  productService = inject(ProductService);

  ngOnInit() {
    console.log("ngOnInit");
    this.productService.getAllProduct().subscribe({
      next: (products) => {
        // this.products = products;
        if (Array.isArray(products)) {
          this.products = products;
        } else {
          console.log('Response is not an array:', products);
          this.products = [];
        }
        // console.log('API Response:', products);
        // this.products = Array.isArray(products) ? products : [];
      },
      error: (e) => {
        console.log('Error:', e.message);
      }
    });
  }

  // Optional trackBy function to optimize ngFor
  trackById(index: number, product: Product): string {
    return product._id;
  }
}
