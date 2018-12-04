import { Component, OnInit } from '@angular/core';
import { Observable, interval, fromEvent, of } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  template: `
    <p>
      rxjs works!
    </p>
  `,
  styles: []
})
export class RxjsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const ob1 = new Observable((observer) => {
      setInterval(() => {
        observer.next({success: true, data: 1});
        observer.next({success: true, data: 2});
        observer.next({success: true, data: 3});
        //observer.complete();
      }, 3000)
    })
    const subscription = ob1.subscribe( (result) => {
      console.log(result);
      subscription.unsubscribe();
    },(error) => {
      console.log(error);
    }, () => {
      console.log('complete！');
    });

    const ob2 = fromPromise(fetch('assets/data.json'));
    ob2.subscribe({
      next(resp) {
        console.log(resp);
      },
      error(error) {
        console.log(error);
      }
    });

    const ob3 = interval(1000).pipe(
      take(5)
    );
    ob3.subscribe(val => console.log('计数：' + val));

    const ob4 = fromEvent(document, 'click');
    ob4.subscribe((evt: MouseEvent) => {
      console.log(evt.clientX + '-' + evt.clientY);
    })

    const ob5 = of();
  }

}
