import { Component } from '@angular/core';
import { extend } from 'webdriver-js-extender';

interface Person {
  fistName: string;
  lastName: string;
}
function greeting(person: Person) {
  return 'hello,' + person.fistName + ' ' + person.lastName;
}

class Greeter {
  greeting: string;
  constructor(msg: string) {
    this.greeting = msg;
  }
  
  greet() {
    return 'Hello, ' + this.greeting;
  }
}

const greeter = new Greeter( 'world' );
console.log(greeter.greet());

class Animal {
  //name: string;
  constructor(protected myName: string) {}

  move(distance: number = 0) {
    console.log(`mooved ${distance}`)
  }
}
class Dog extends Animal {
  bark() {
    console.log('wow, wow');
  }
}

// const dog = new Dog();
// dog.bark();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kkb-stu';
}
