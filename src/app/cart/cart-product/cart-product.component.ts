import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemService } from 'src/app/item.service';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css']
})
export class CartProductComponent implements OnInit {
  qty:number = 1
  constructor(public itemService:ItemService, public userService:LoginService) { }
  total:number 
  cartTotal:number
  isRemoved:boolean = false
  @Output() event = new EventEmitter<{item_id:string, qty:number, price:number}>();
  @Output() removeProductEvent = new EventEmitter<string>();
  @Input() item:any ={}
  
  ngOnInit(): void {
    var cart:any[] = this.userService.user.cart
    cart.forEach(element => {
      if(element.itemId._id==this.item._id){
        this.qty = element.qty
      }
    });
    this.total = this.item.item_price * this.qty
  }
  
  increase(){
    this.qty++
    this.total = this.item.item_price*this.qty
    this.userService.changeCartQty({itemId:this.item._id,qty:this.qty})
    this.event.emit({item_id:this.item._id, qty:this.qty, price:this.item.item_price})
  }
  
  decrease(){
    if(this.qty == 1){
      this.isRemoved = true
      this.removeProduct()
    }
    this.qty--;
    this.total = this.item.item_price*this.qty
    this.userService.changeCartQty({itemId:this.item._id,qty:this.qty})
    this.event.emit({item_id:this.item._id, qty:this.qty, price:this.item.item_price})
  }
  removeProduct(){
    this.removeProductEvent.emit(this.item._id)
    this.isRemoved = true
  }
}
