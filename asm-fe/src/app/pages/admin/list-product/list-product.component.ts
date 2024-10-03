import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Product } from '../../home-page/home-page.component';

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [RouterLink], // Remove HotToastService from here
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css'], // Fix typo (styleUrl -> styleUrls)
})
export class ListProductComponent {
  productService = inject(ProductService);
  toast = inject(HotToastService);

  products: Product[] = [];

  ngOnInit() {
    this.productService.getAllProduct().subscribe({
      next: (response) => {
        if (Array.isArray(response.data)) {
          this.products = response.data;
          console.log('Products loaded successfully!');
          this.toast.success("successfully");
          // this.toast.success('Products loaded successfully!', {
          //   className: 'bg-green-500 text-white rounded-lg p-4 shadow-lg',
          //   duration: 2000, 
          //   style: {
          //     animation: 'fadeInOut 2.5s forwards', 
          //   },
          // });
        } else {
          console.log('Response is not an array:', response);
          this.products = [];
        }
      },
      error: (e) => {
        console.log('Error:', e.message);
        // this.toast.error('Error: ' + e.message);
      },
    });
  }

  handleRemoveProduct(_id: number | string) {
    if (window.confirm('Delete product?')) {
      this.productService.deleteProduct(_id).subscribe({
        next: () => {
          this.products = this.products.filter(
            (product) => product._id !== _id
          ); 
          this.toast.success("successfully")
          // this.toast.success('Product deleted successfully!'); 
          alert("Delete successfully!");
        },
        error: (e) => {
          console.log(e);
          this.toast.error('Error: ' + e.message); 
        },
      });
    }
  }
}
