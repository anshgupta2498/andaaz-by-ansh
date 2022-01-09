import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  total = 0
  ordersIds:any[]
  ordersObjs:any[] = []
  flag = false
  constructor(public orderService:OrderService) { }

  ngOnInit(): void {
    var user = JSON.parse(localStorage.getItem('user')||'{}') 
    this.ordersIds = user.orders 
    if(this.ordersIds.length>0)
    this.flag =true
    this.fetchOrders();
  }
  fetchOrders(){
    this.ordersIds.forEach((order)=>{
      this.orderService.fetchOrder(order).subscribe(data=>{
        this.ordersObjs.push(data.order)
      });
    })
  }
}
