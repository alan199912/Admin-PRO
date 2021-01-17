import { Component, Input, OnInit } from '@angular/core';

import { MultiDataSet, Label, Color } from 'ng2-charts'

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styles: [
  ]
})
export class DonutComponent implements OnInit {

  @Input() title: string = 'Without title'

  // Doughnut
  @Input('labels') public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input('data') public doughnutChartData: MultiDataSet = [
    [350, 450, 100],
  ];

  public colors: Color[] = [
    { backgroundColor: ['#6857E6', '#009FEE', '#F02059']}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
