import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalid: boolean = false;
  valid: boolean = false;
  errMsg:string = 'Invalid Creds! Please try again'
  constructor(public loginService:LoginService, public router:Router) { }

  ngOnInit(): void {
  }
  login(email:string, password:string){
    this.loginService.login({email:email, password:password}).subscribe((data)=>{
      this.invalid = false
      document.cookie = `token=Bearer ${data.token}`
      localStorage.setItem('user',JSON.stringify(data.user));
      this.loginService.user = data.user
      this.router.navigate(['home'])
    },
    err=>{
      this.invalid = true
    })
  }
}
