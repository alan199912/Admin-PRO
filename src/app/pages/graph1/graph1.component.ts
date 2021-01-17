import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graph1',
  templateUrl: './graph1.component.html',
  styles: [
  ]
})
export class Graph1Component implements OnInit {

  public labels1: string[] = ['Bread', 'Soda', 'Taco']

  public data1 = [
    [10, 15, 40],
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
