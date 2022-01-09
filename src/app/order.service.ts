import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(public http:HttpClient, public userService:LoginService) { }

  fetchOrder(order_id:any){
    let headers = new HttpHeaders().set('Authorization', this.userService.setAuthToken())
    return this.http.get<{message:string, order:any}>(`https://andaaz-by-ansh.herokuapp.com/api/v1/orders/order/${order_id}`, {headers:headers})
  }
}
