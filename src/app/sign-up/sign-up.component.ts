import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  invalid: boolean = false;
  valid: boolean = false;
  errMsg:string = "Invalid credentials! Please try again"
  constructor(public router:Router, public service:LoginService) { }

  ngOnInit(): void {
  }
  signUp(photo:any,name:any, email:any,password:any,passwordConfirm:any ,mobile:any, gender:any, house:any, street:any, city:any, state:any){
    console.log('signing up')
    console.log(gender.value, 'gender')
    let user:any = {}
    if(photo.value!='')
      user.photo  = photo.value;
    user.name = name.value;
    user.email = email.value;
    user.password = password.value;
    user.passwordConfirm = passwordConfirm.value;
    user.mobile = mobile.value;
    user.gender = gender.value
    user.address = []
    var address:any = {}
    address.house = house.value
    address.street = street.value
    address.city = city.value
    address.state = state.value
    user.address.push(address)
  
      this.service.signUp(user).subscribe(data=>{
        console.log("inside obs");
        document.cookie = `token=Bearer ${data.token}`
      console.log(document.cookie)
      localStorage.setItem('user',JSON.stringify(data.createdUser));
      this.service.user = data.createdUser
      console.log(data.createdUser)
      console.log(this.service.user)
      this.router.navigate(['home'])
        this.invalid = false
        this.valid = true;
      },
      err=>{
        console.log(err);
        this.errMsg = err.error.message;
        this.invalid = true;
        this.valid = false
      })

  }
}
