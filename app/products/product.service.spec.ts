
import { ProductService } from './product.service';
import { CustomerService } from './product.service';




import {
    expect, it, iit, xit,
    describe, ddescribe, xdescribe,
    beforeEach, beforeEachProviders, withProviders,
    async, inject, injectAsync
} from '@angular/core/testing';

import { TestComponentBuilder } from '@angular/compiler/testing';

import { By }             from '@angular/platform-browser';
import { provide }        from '@angular/core';
import { ViewMetadata }   from '@angular/core';
import { PromiseWrapper } from '@angular/core/src/facade/promise';

import {MockBackend, MockConnection} from '@angular/http/testing';
import { BlogService } from './product.service';
import {Headers, HTTP_PROVIDERS, BaseRequestOptions, XHRBackend, Response} from '@angular/http';
import {ResponseOptions, ResponseType} from '@angular/http';
//import {provide} from '@angular/core';
import { IProduct } from './product';
//import 'rxjs/Rx';  //load all features
import { Observable } from 'rxjs/Observable';




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


    describe('CustomerService using Mock Service', () => {
        beforeEachProviders(() => [
            provide(ProductService, { useClass: ProductServiceMock }),
            CustomerService
        ]);
        it('should get customer MOCK stuff', inject([CustomerService], (cust: CustomerService)=> {
            let customerDetails = cust.getCustomerDetails();
            expect(customerDetails).toBe('Customer purchased: Mock stuff!');
        }));
    });


describe('Blog Service', () => {

    // All heed this block - it is required so that the test injector
    // is properly set up. Without doing this, you won't get the
    // fake backend injected into Http.

    // Also, you need to inject MockBackend as a provider before you wire
    // it to replace XHRBackend with the provide function!  So this is all
    // extremely important to set up right.
    beforeEachProviders(() => {
        return [
            HTTP_PROVIDERS,
            provide(XHRBackend, { useClass: MockBackend }),
            BlogService
        ];
    });


    it('should get products', inject([XHRBackend, BlogService], (mockBackend: MockBackend, blogService: BlogService) => {
        mockBackend.connections.subscribe(
            (connection: MockConnection) => {
                connection.mockRespond(new Response(
                    new ResponseOptions({
                        body: [
                            {
                                productId: 26,
                                productCode: 'code',
                                productName: 'name'
                            }]
                    }
                    )));
            });

        blogService.getProducts().subscribe(
            (blogs: IProduct[]) => {
            expect(blogs.length).toBe(1);
            console.log(blogs);
           expect(blogs[0].productId).toBe(26);
        });

    }));

    it('should get products async', injectAsync([XHRBackend, BlogService], (mockBackend: MockBackend, blogService: BlogService) => {
                    // injectAsync requires us to return a promise - if we let it complete,
                    // or if we call pass, it passes. If we call fail, we can fail the test.
                    return new Promise((pass, fail) => {
                        // the same implementation here
                        mockBackend.connections.subscribe(
                                (connection: MockConnection) => {
                                connection.mockRespond(new Response(
                                  new ResponseOptions({
                                      body: [
                                        {
                                              productId: 26,
                                              productCode: 'code',
                                              productName: 'name'
                                           }]
                                        }
                                )));
                              });
                            blogService.getProducts().subscribe((data) => {
                                expect(data.length).toBe(1);
                                expect(data[0].productId).toBe(26);
                                expect(data[0].productName).toBe('name');
                           },
                                    (error) => {
                                      // we can call a failure case here...
                                  });
                        });
                }));

    it('should run async handleError implementation', injectAsync([XHRBackend, BlogService], (mockBackend: MockBackend, blogService: BlogService) => {
        return new Promise((pass, fail) => {
            mockBackend.connections.subscribe(
                (connection: MockConnection) => {
                    connection.mockError(new Error('error'));
                });

            //sends back actual implementation message ('Server error')
            var getErrorHandler = spyOn(blogService, 'handleError').and.callThrough();

            blogService.getProducts().subscribe((data) => {
                //this aint being run since it is an error case
            },
                (error) => {
                    // fail(error);
                    console.log(error);

                    expect(getErrorHandler).toHaveBeenCalled();
                    expect(error).toBe('Server error');
                });
        });
    }));

    it('should run async handleError with Fake', injectAsync([XHRBackend, BlogService], (mockBackend: MockBackend, blogService: BlogService) => {
        return new Promise((pass, fail) => {
            mockBackend.connections.subscribe(
                (connection: MockConnection) => {
                    connection.mockError(new Error('error'));
                });

            //sends back fake message
            var getFakeErrorHandler =
                spyOn(blogService, 'handleError').and.
                    callFake(function () { return Observable.throw('Fake Server error') );

            blogService.getProducts().subscribe((data) => {
                //this aint being run since it is an error case
            },
                (error) => {
                   // fail(error);
                    console.log(error);

                    expect(getFakeErrorHandler).toHaveBeenCalled();
                    expect(error).toBe('Fake Server error');
                });
        });
    }));








    });  //end describe




//Using extends to create the mock service

class MockBlogService extends BlogService {
    constructor() {
        super(null);
    }
    getProducts() {
        console.log('sending fake answers!');
        return Observable.of([
            {
                productId: 2,
                productCode: 'Fake CODE',
                productName: 'Fake NAME'
            }]);
    }
}

describe('Blog Roll unit test', () => {
    var blogService: BlogService;
    beforeEach(() => {
        blogService = new MockBlogService();
    });

    it('shows list of items = 1', () => {
        blogService.getProducts().subscribe(
            (blogs: IProduct[]) => {
                expect(blogs.length).toBe(1);
                console.log(blogs);
                expect(blogs[0].productId).toBe(2);
                expect(blogs[0].productCode).toBe('Fake CODE');
            });

    });
});
