 import { Injectable } from '@angular/core';
 import { Http, Response } from '@angular/http';
 import { Observable } from 'rxjs/Observable';
 //import 'rxjs/add/operator/map'
 import 'rxjs/Rx';  //load all features
 import { IProduct } from './product';
 import {Headers} from '@angular/http'
 import {RequestOptions} from '@angular/http'

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

 @Injectable()
 export class BlogService {
     private _productUrl = 'api/products/products.json'; // this is he one that works locally

     opts: RequestOptions;

     constructor(private http: Http) {
         var headers: Headers = new Headers();
         headers.append('content-type','application/json; charset=utf-8');
         this.opts = new RequestOptions();
         this.opts.headers = headers;
     }

     getProducts(): Observable<IProduct[]>{
         return this.http.get(this._productUrl)
             .map((response: Response) => <IProduct[]> response.json())
             .catch(this.handleError);
     }

     private handleError(error: Response) {
         console.error(error);
         //console.error(error.json().message);
         //return Observable.throw(error.json().error || error.json().message);    //|| 'Server error');
         return Observable.throw('Server error');
     }

 }


