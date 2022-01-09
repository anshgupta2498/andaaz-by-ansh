import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user: any = {}
  token:string = ''
  constructor(public http: HttpClient) {
    console.log(localStorage.user)
    console.log(this.user)
    this.user = JSON.parse(localStorage.getItem('user') || '{}')
    console.log(this.user)
    // this.token = this.setAuthToken();
    console.log(this.token)
  }
  changeCartQty(obj: any) {
    var user = JSON.parse(localStorage.getItem('user') || '{}')
    var cart: any[] = user.cart
    console.log(user.cart)
    var newCart: any[] = []
    if (cart.length == 0) {
      console.log('pushing')
      newCart.push(obj)
      cart.push(obj)
    }
    else {
      for (var item of cart) {
        if (item.itemId._id == obj.itemId) {
          if (obj.qty == 0) {
            continue
          }
          var obj1 = { qty: obj.qty, itemId: obj.itemId }
          newCart.push(obj1)
          continue
        }
        newCart.push({ qty: item.qty, itemId: item.itemId._id })
      }
    }
    console.log('obj')
    console.log(obj)
    console.log(cart)
    this.user.cart = newCart
    this.saveUserData(this.user).subscribe(data => {
      this.user = data.user
      console.log(data.user)
      localStorage.setItem('user', JSON.stringify(this.user));
    })
  }
  login(userData: any) {
    return this.http.post<{ message: string, user: any, token: string }>('https://andaaz-by-ansh.herokuapp.com/api/v1/users/login', { ...userData })
  }
  signUp(userData: any) {
    return this.http.post<{ message: string, createdUser: any, token: string }>('https://andaaz-by-ansh.herokuapp.com/api/v1/users/user', { ...userData })
  }
  setAuthToken(): string {
    if (document.cookie == '') {
      return ''
    }
    else {
      var cookieArr = document.cookie.split(';')
      console.log(cookieArr)
      var token = ''
      var flag: boolean = false
      cookieArr.forEach(item => {
        if (item.startsWith('token=')){
        token = item.substr(6)
        }
        console.log(token)
      })
    }
    if (token == '') {
      return ''
    }
    return token
  }
  verifyToken(token: string) {
    let headers = new HttpHeaders().set('Authorization', token).set('logincheck','true');
    this.token = token
    return this.http.post<{ obj: any }>('https://andaaz-by-ansh.herokuapp.com/api/v1/users/verify', {}, { headers: headers, observe: 'response' })
  }
  saveUserData(user: any) {
    let headers = new HttpHeaders().set('Authorization', this.token)
    return this.http.post<{ message: string, user: any }>('https://andaaz-by-ansh.herokuapp.com/api/v1/users/updateMe', { ...user }, {headers:headers})
  }
}
