import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../item.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart:any[]
  cartItems:any[] = []
  cartSummary:any[] = []
  total:number = 0
  hasItems:boolean = false
  totalCartSummary:any
  constructor(public router:Router, public userService:LoginService,public itemService:ItemService) { }

  ngOnInit(): void {
    console.log('hi')
    var user = JSON.parse(localStorage.getItem('user')||'{}')
    this.cart = user.cart;
    console.log(this.cart)
    if(this.cart.length>0){
      this.hasItems = true
    }
    this.getCartItems();
  }

  getCartItems(){
    if(this.cart.length ==0){
      this.hasItems = false
      return
    }
    for(var item of this.cart){
      console.log(item);
      if(item.qty == 0){
        continue
      }
      console.log(this.total, item.itemId.item_price, item.qty)
      this.total = this.total + (Number.parseInt(item.itemId.item_price)*item.qty)
        this.cartSummary.push({item_id:item.itemId._id, qty:item.qty, price:item.itemId.item_price})
        this.cartItems.push(item.itemId)
        this.itemService.cartSummary = this.cartSummary
        this.itemService.total = this.total
    }
    this.totalCartSummary = {total:this.total, summary: this.cartSummary}
    this.itemService.totalCartSummary = this.totalCartSummary
  }
  addToArray(combo:any){
    console.log("before entering")
    console.log(this.cartSummary);
    for(var obj of this.cartSummary){
        if(obj.item_id==combo.item_id){
          var index = this.cartSummary.indexOf(obj)
          this.cartSummary.splice(index,1)
           console.log("popped");
          console.log(this.cartSummary);
          break;
        }
      }
      console.log('combo', combo)
      this.cartSummary.push(combo);
      console.log(this.cartSummary);
      var itemTotal = 0
      this.cartSummary.forEach(item=>{
        console.log(item, item)
        itemTotal = itemTotal +  Number.parseInt(item.price) * item.qty
      })
      console.log('total',itemTotal)
      this.total = itemTotal
      this.itemService.cartSummary = this.cartSummary
      this.itemService.total = this.total
      this.totalCartSummary = {total:this.total, summary: this.cartSummary}
      this.itemService.totalCartSummary = this.totalCartSummary
      var user = JSON.parse(localStorage.getItem('user')||'{}')
      this.cart = user.cart
    }

    removeProduct(item_id:string){
      var user = JSON.parse(localStorage.getItem('user')||'{}')
      this.cart = user.cart
      console.log(this.cart)
      this.cart.forEach((item)=>{
        console.log(item)
        if(item.itemId._id == item_id){
          console.log("in ")
          var index = this.cart.indexOf(item)
          this.cart.splice(index,1);
        }
      })
      this.cartSummary.forEach((item)=>{
        console.log(item)
        if(item.item_id == item_id){
          console.log("in ")
          var index = this.cartSummary.indexOf(item)
          this.cartSummary.splice(index,1);
        }
      })
      
      var user = this.userService.user
      user.cart = this.cart
      this.userService.changeCartQty({itemId:item_id,qty:0})
      console.log(this.cart)
      // this.getCartItems()
      this.calculateTotal();

    }
    calculateTotal(){
      var totalPrice:number = 0
      console.log(this.cart)
      this.cart.forEach(item=>{
        totalPrice = totalPrice + item.qty * Number.parseInt(item.itemId.item_price)
      })
      this.total = totalPrice
      this.total == 0 ? this.hasItems =false : this.hasItems
      console.log(this.total)
    }
    checkout(){
      this.router.navigate(['check-out'], {state:{summary:this.cartSummary, total:this.total}})
    }
  }
