
import { ProductService } from './product.service';
import { CustomerService } from './product.service';




import {
    expect, it, iit, xit,
    describe, ddescribe, xdescribe,
    beforeEach, beforeEachProviders, withProviders,
    async, inject
} from '@angular/core/testing';

import { TestComponentBuilder } from '@angular/compiler/testing';

import { By }             from '@angular/platform-browser';
import { provide }        from '@angular/core';
import { ViewMetadata }   from '@angular/core';
import { PromiseWrapper } from '@angular/core/src/facade/promise';

////////  SPECS  /////////////

    //SERVICE WITH DEPENDENCIES
    // When testing CustomerService we are directly hitting ProductService, 
    // which technically turns this into an integration test.
    describe('CustomerService', () => {
        beforeEachProviders(() => [
            ProductService,
            CustomerService
        ]);
        it('should get customer stuff', inject([CustomerService], (cust: CustomerService) => {
            let customerDetails = cust.getCustomerDetails();
            expect(customerDetails).toBe('Customer purchased: tools and stuff');
        }));
    });


    //MOCK DEPENDENCIES
    //override the ProductService dependency and replace it with a mock.
    class ProductServiceMock {
        getProducts() {
            return 'Mock stuff!';
        }
    }

    describe('CustomerService', () => {
        beforeEachProviders(() => [
            provide(ProductService, { useClass: ProductServiceMock }),
            CustomerService
        ]);
        it('should get customer MOCK stuff', inject([CustomerService], (cust: CustomerService)=> {
            let customerDetails = cust.getCustomerDetails();
            expect(customerDetails).toBe('Customer purchased: Mock stuff!');
        }));
    });