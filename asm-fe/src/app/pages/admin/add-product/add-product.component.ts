import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';
import { Category, CategoryService } from '../../../services/category.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  addForm: FormGroup = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
    price: new FormControl(),
    image: new FormControl(),
    category: new FormControl()
  });

  productService = inject(ProductService);
  router = inject(Router);
  categoryService = inject(CategoryService);
  categories: Category[] = []; // To store the categories

  ngOnInit() {
    this.fetchCategories(); // Fetch categories on component initialization
  }

  fetchCategories() {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        console.log('API Response:', response); // Log the API response
        if (Array.isArray(response.data)) { // Ensure response has a data array
          this.categories = response.data; // Store the categories
        } else {
          console.error('Unexpected response format:', response);
          this.categories = []; // Reset categories if the format is unexpected
        }
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
        this.categories = []; // Reset categories on error
      }
    });
  }

  handleSubmit(){
    this.productService.createProduct(this.addForm.value).subscribe({
      next: ()=>{
        alert("add successfully!");
        this.router.navigateByUrl("/admin/product/list");
      },
      error: (error)=>{
        alert("Error");
        console.log("Error" + error.message)
      }
    })
  }
}
