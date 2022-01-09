import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../item.service';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  total:number
  cartSummary:any
  constructor(public paymentService:PaymentService,public itemService:ItemService, public router:Router, public route:ActivatedRoute) { 
    this.cartSummary = this.router.getCurrentNavigation()?.extras.state
  }
  ngOnInit(): void {
    this.total = this.itemService.total
    if(this.itemService.total == undefined){
      // this.router.navigate(['cart']);
    }
  }
}
