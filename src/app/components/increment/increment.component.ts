import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-increment',
  templateUrl: './increment.component.html',
  styles: [
  ]
})
export class IncrementComponent implements OnInit {

  @Input('progressValue') progress: number = 50; // * create a variable to progress
  @Input() btnClass: string = 'btn-primary';

  @Output('progressValue') valueOut: EventEmitter<number> = new EventEmitter();

  // * to change the value of the progress
  changeValue(value: number) {

    if(this.progress >= 100 && value >= 0) {
      this.valueOut.emit(100);
      return this.progress = 100;
    }

    if(this.progress <= 0 && value < 0) {
      this.valueOut.emit(0);
      return this.progress = 0;
    }

    this.progress = this.progress + value;
    this.valueOut.emit(this.progress);
  }

  onChange(value: number) {

    if(value >= 100) {
      this.progress = 100
    } else if(value <= 0) {
      this.progress = 0
    } else {
      this.progress = value
    }

    this.valueOut.emit(this.progress)
  }

  constructor() { }

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`
  }

}
