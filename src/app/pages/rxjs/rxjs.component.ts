import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  public intervalSubs: Subscription;

  constructor() {

    // this.returnObservable().pipe(
    //   retry(1) // * continue try
    // ).subscribe(
    //   value => console.log('Subs ', value),
    //   error => console.log(error),
    //   () => console.log('Complete')
    // );

    this.intervalSubs = this.returnInterval()
      .subscribe(console.log)

  }

  ngOnInit(): void {
  }

  returnInterval(): Observable<number> {
    return interval(500)
            .pipe(
              take(10), // * taken ten values
              map(value => value+1),
              filter(value => value % 2 === 0),
            );
}


  returnObservable(): Observable<number> {
    let i = 0

    return new Observable<number>( observer => {
      const interval = setInterval( () => {
        i++
        observer.next(i)

        if(i === 4) {
          clearInterval( interval )
          observer.complete();
        }

        if(i === 2) {
          observer.error('Error unexplained')
        }

      }, 1000)
    });
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe()
  }

}
