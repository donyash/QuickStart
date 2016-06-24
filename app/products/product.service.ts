 import { Injectable } from '@angular/core';
 import { Http, Response } from '@angular/http';
 import { Observable } from 'rxjs/Observable';

 import { IProduct } from './product';
 import {Headers} from '@angular/http'

 @Injectable()
 export class ProductService  {
    
   constructor(private _http: Http) { }

   getProducts(): string {
       return "Buy my product";
   }

}
