import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html'
})
export class OrderSummaryComponent implements OnInit {

  rated: boolean;

  constructor() { }

  ngOnInit() {
  }

  rate() {
    this.rated  = true;
  }
}
