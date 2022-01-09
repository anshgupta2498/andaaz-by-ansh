import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { LoginService } from "./login.service";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(public router:Router, public loginService:LoginService){
        
    }
    canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot):Observable<boolean> | boolean{
        if(document.cookie ==''){
            this.router.navigate(['login']);
            return false
        }
        var cookieArr = document.cookie.split(';')
        console.log(cookieArr)
        var token = ''
        var flag:boolean = false
        cookieArr.forEach(item=>{
         if(item.startsWith('token='))
            token = item.substr(6)
        
        console.log(token)
        })
        if(token){
            return this.loginService.verifyToken(token).pipe(
                map((data) => {
                    if (data.status==200) {
                        // this.router.navigate(['home']);
                        return true;
                    } else {
                        this.router.navigate(['login']);
                        return false; 
                    }
                }),
                catchError(err=>{
                    throwError(err);    
                    this.router.navigate(['login']);
                    return Observable.throw(false);
                }));
        }else{
            this.router.navigate(['login']);
        console.log('false');
        return false;
    }
}
}