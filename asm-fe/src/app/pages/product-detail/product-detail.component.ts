import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Product } from '../home-page/home-page.component';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [NgIf],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  product: Product | null = null;
  productService = inject(ProductService);
  route = inject(ActivatedRoute);

  ngOnInit(){
    this.route.params.subscribe((params)=>{
      const productId = params['id'];
      if(productId){
      console.log(productId);
        this.productService.getProductDetail(productId).subscribe({
          next:(data)=>{
            console.log(data.data);
            this.product = data.data
          },
          error: (error)=>{
            console.log(error.message);
            alert("Error: " + error.message);
          }
        })
      }
    })
  }
}
