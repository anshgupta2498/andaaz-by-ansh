import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/item.service';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  message:string ='Adidas blue T-shirt for men'
  @Input() item:any
  cart:any[]
  isMen:boolean = true
  loggedIn:boolean = false
  inCart:boolean = false
  constructor(public itemService:ItemService, public router:Router ,public userService:LoginService) { }

  ngOnInit(): void {
    if(this.item.item_gender == 'Female')
      this.isMen = false
    var user = JSON.parse(localStorage.getItem('user')||'{}')
    console.log(user)
    if(Object.keys(user).length>0){
      this.loggedIn = true
    this.cart = user.cart
    console.log(this.userService.user)
    console.log(this.cart)
    console.log("hilo")
    this.isInCart()
    }
  }

  isInCart(){
    if(this.cart.length == 0) this.inCart = false
    this.cart.forEach(item=>{
      console.log(item)
      if(this.item._id == item.itemId._id){
      console.log('inn')
      this.inCart = true
    } 
  })}

  addToCart(){
    if(this.loggedIn){
      this.inCart = true
      console.log(this.item._id)
      this.itemService.addToCart(this.item._id).subscribe(data=>{
        console.log(data);
        localStorage.setItem('user',JSON.stringify(data.user));
      })
    }
    else{
      this.router.navigate(['login']);
    }
  }
}
