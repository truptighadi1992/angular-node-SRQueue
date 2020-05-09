import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from "./../products/product.interface";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getProductList(){
    return this.http.get<{message: string, products: Product[]}>('http://localhost:3000/api/products');
  }
  getProductData(productId){
      return this.http.get<{message: string, product: Product}>('http://localhost:3000/api/products/'+productId);
  }
}
