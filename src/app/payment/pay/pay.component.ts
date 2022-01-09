import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ItemService } from 'src/app/item.service';
import { LoginService } from 'src/app/login.service';
import { PaymentService } from 'src/app/payment.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
  totalCartSummary:any
  total:number
  orderObj:{item:any[], user:any, shippingAddress:any,totalPrice:any} = {item:[], user:'', shippingAddress:'', totalPrice:''}
  constructor(public itemService:ItemService,public loginService:LoginService, public paymentService:PaymentService, public router:Router, public route:ActivatedRoute) { }
  @Output() event = new EventEmitter<{cardNumber:any,name:any, expiry:any, cvv:any}>();
  ngOnInit(): void {
    if(this.itemService.total == undefined){
      this.router.navigate(['cart']);
    }
    this.total = this.itemService.total
    var arr:any[] = []
    this.itemService.totalCartSummary.summary.forEach(element => {
      arr.push({item_id:element.item_id, quantity:element.qty});
    });
    this.orderObj.item = arr
    this.orderObj.user = this.loginService.user._id
    this.orderObj.shippingAddress = this.itemService.shippingAddress
    this.orderObj.totalPrice = this.total
  }

  pay(cardNumber:string, name:string, expiry:any, cvv:any){
    this.paymentService.pay(cardNumber, expiry, cvv, name).subscribe((data:HttpResponse<any>)=>{
      if(data.status==200){
        this.paymentService.orderPlaced(this.orderObj).subscribe((data)=>{
          localStorage.setItem('order_id',data.order_created._id);
          this.router.navigate(['success'],{relativeTo:this.route})
          var user = this.loginService.user
          user.orders.push(data.order_created._id)
          user.cart = []
          this.loginService.saveUserData(user).subscribe(data=>{
            localStorage.setItem('user',JSON.stringify(data.user))
          });
        })
      }
      else{
      this.router.navigate(['failure'],{relativeTo:this.route})
      }
            },
    err=>{
      this.router.navigate(['failure'],{relativeTo:this.route})
    })
  }
}
  
