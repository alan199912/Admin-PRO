import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: [
    './progress.component.css'
  ]
})
export class ProgressComponent implements OnInit {

  progress1: number = 25
  progress2: number = 55

  // * to get the percernt of the progress
  get getPercent1() {
    return `${this.progress1}%`
  }

  get getPercent2() {
    return `${this.progress2}%`
  }


  constructor() { }

  ngOnInit(): void {
  }

}
