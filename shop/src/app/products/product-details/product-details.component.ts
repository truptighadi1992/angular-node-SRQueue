import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productId:string;
  product:Product;
 
  rating = Array.from( Array(5), (l, index)=> index);
  constructor( private router:Router, private route:ActivatedRoute, private productService:ProductService, private _snackBar:MatSnackBar) { }

  ngOnInit(): void {

    var self = this;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("productId")) {
        this.productId = paramMap.get("productId");
        this.productService.getProductData(this.productId).subscribe(
          result =>{
              self.product = result.product; 
          },
          err =>{
            console.log(err);
            this._snackBar.open('Unable to retrive product details', "Ok",{
              duration: 5000,
            });
          }
        )
      }
    })
  }

}
