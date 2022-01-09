import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(public http:HttpClient, public userService:LoginService) { }

  pay(cardNumber:any,expiry:any,cvv:any,name:any){ 
    console.log(this.userService.setAuthToken())
    let headers = new HttpHeaders().set('Authorization', this.userService.setAuthToken())
    return this.http.post('https://andaaz-by-ansh.herokuapp.com/api/v1/orders/order/pay',{cardNo:cardNumber, expiry, cvv,name}, {headers:headers , observe: 'response'})
  }

  orderPlaced(orderObj:any){
    console.log("in")
    console.log(this.userService.setAuthToken())
    let headers = new HttpHeaders().set('Authorization', this.userService.setAuthToken())
    return this.http.post<{message:any,order_created:any}>('https://andaaz-by-ansh.herokuapp.com/api/v1/orders/order/create',{...orderObj}, {headers:headers})
  }
}
