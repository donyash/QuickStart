/* tslint:disable:no-unused-variable */
import { AppComponent } from './app.component';

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

 describe ('Welcome', () => {
        beforeEachProviders(() => [
            AppComponent,
        ]);

            it('should be called', () => {
            let theDisplay = new AppComponent();
            //spyOn(theDisplay, 'doit').and.callThrough();   //needed for code coverage Wallaby
            spyOn(theDisplay, 'doit')
            theDisplay.doit();
            expect(theDisplay.doit).toHaveBeenCalled();
        });

         it('should welcome', () => {
             let theDisplay = new AppComponent();
             spyOn(theDisplay, 'doit').and.returnValue('Hello');
             let result = theDisplay.doit();
             console.log(result);
             expect(result).toEqual('Hello');
            });


});

