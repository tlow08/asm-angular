import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { text } from 'stream/consumers';
export type Product = {
  _id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  brand: string;
};

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  products: Product[] = [];
  productService = inject(ProductService);
  toast = inject(HotToastService);
  ngOnInit() {
    console.log("ngOnInit");
    this.productService.getAllProduct().subscribe({
      next: (response) => {
        // console.log('API Response:', response);
        if (Array.isArray(response.data)) {
          this.products = response.data;
          // alert("successfully");
          console.log("successfully!");
          // this.toast.success("Successfully!",{
          //   duration: 1000,
          //   position: 'top-center',
          //   style: {
          //     with: '20px',
          //     color: 'green', // Custom color for the toast text
          //     backgroundColor: '#f0f8ff', // Optional: Custom background color
          //     borderRadius: '8px', // Optional: Rounded corners
          //     boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)', // Optional: Subtle shadow
          //   },
          // });
        } else {
          console.log('Response is not an array:', response);
          this.products = [];
        }
      },
      error: (e) => {
        console.log('Error:', e.message);
        alert("Error: " + e.message);
        this.toast.error("Error: " + e.message);
      }
    });
  }

  trackById(index: number, product: Product): string {
    return product._id;
  }
}
