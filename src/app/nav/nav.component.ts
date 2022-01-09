import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  user:any = {}
  constructor(public router:Router, public service:LoginService) { }
  loggedIn:boolean = false
  ngOnInit(): void {
    this.user = this.service.user
    if(Object.keys(this.user).length == 0){
      this.loggedIn = true
    }
  }
  login(){
    this.router.navigate(['login'])
  }
  logout(){
    localStorage.clear();
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    this.router.navigate(['login'])
  }
  cart(){
    this.router.navigate(['cart'])
  }
  
}
