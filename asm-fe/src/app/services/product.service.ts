import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export type Product = {
  _id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  brand:string;
}
export type ProductResponse = {
  message: string;
  data: Product[];
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl ='/api/products';
  constructor(private http: HttpClient) {}
  // http = inject(HttpClient);

  getAllProduct(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(this.apiUrl);
  }
  getProductDetail(_id: string| number){
    return this.http.get<Product>(`${this.apiUrl}/${_id}`)
  }
}
