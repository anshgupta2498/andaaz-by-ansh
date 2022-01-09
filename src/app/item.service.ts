import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(public loginService:LoginService,public http:HttpClient) { }
  cartSummary:any[]
  shippingAddress:any
  totalCartSummary:{summary:any[], total:any}
  total:number
  getCategorizedItems(category:string){
    return this.http.post<{message:string, items:any}>('https://andaaz-by-ansh.herokuapp.com/api/v1/items/',{category})
  }
  exploreItems(){
    return this.http.get<{message:string, items:any}>('https://andaaz-by-ansh.herokuapp.com/api/v1/items/')
  }
  
  addToCart(itemId:string){
    let headers = new HttpHeaders().set('Authorization', this.loginService.setAuthToken())
    var email = this.loginService.user.email
    return this.http.post<{message:string, user:any}>('https://andaaz-by-ansh.herokuapp.com/api/v1/users/addToCart', {email, itemId}, {headers:headers})
  }
  getCartItems(itemId:any, qty:any){
    return this.http.get<{message:string, item:any, qty:any}>(`https://andaaz-by-ansh.herokuapp.com/api/v1/items/item/${itemId}`)
  }

}
