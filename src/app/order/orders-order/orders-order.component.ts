import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-order',
  templateUrl: './orders-order.component.html',
  styleUrls: ['./orders-order.component.css']
})
export class OrdersOrderComponent implements OnInit {
  @Input() order_id:any 
  constructor() { }

  ngOnInit(): void {
  }

}
