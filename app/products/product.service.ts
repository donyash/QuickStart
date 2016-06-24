 import { Injectable } from '@angular/core';
 import { Http, Response } from '@angular/http';
 import { Observable } from 'rxjs/Observable';

 import { IProduct } from './product';
 import {Headers} from '@angular/http'

 @Injectable()
 export class ProductService  {
    
   constructor() { }

   getProducts(): string {
       return "tools and stuff";
   }

 }



 @Injectable()
 export class CustomerService {
     productService: ProductService;
     constructor(productService: ProductService) {
         this.productService = productService;
     }
     getCustomerDetails(): string {
         let products = this.productService.getProducts();
         return 'Customer purchased: ' + products;
     }
 }
