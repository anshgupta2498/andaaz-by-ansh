import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../item.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartData:any
  addresses:any[] = []
  constructor(public router:Router, public itemService:ItemService, public userService:LoginService) { 
    this.cartData = this.router.getCurrentNavigation()?.extras.state
    this.addresses = this.userService.user.address
    
  }

  ngOnInit(): void {
    
  }
  selectAddress(address:any){
    this.cartData.address = address
    this.itemService.shippingAddress = address
    
    this.router.navigate(['payment'],{state:this.cartData})
  }

}
