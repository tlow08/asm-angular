import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export type Product = {
  _id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  brand:string;
}
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}
  // http = inject(HttpClient);

  getAllProduct(): Observable<Product[]>{
    return this.http.get<Product[]>('http://localhost:8000/api/products');
  }

  getProductDetail(_id: string| number){
    return this.http.get<Product>(`http://localhost:8000/api/products/${_id}`)
  }
}
