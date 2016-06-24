import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    template: '<h1>Angular 2 App</h1>'
})
export class AppComponent {
    Name: string;
    State: boolean;

public pageTitle: string = 'Welcome';
constructor() {
     this.Name = 'Howdy';
     this.State = false;
}

    doit(): string {
        let x = 'Hello';
        return x;
    }

}

