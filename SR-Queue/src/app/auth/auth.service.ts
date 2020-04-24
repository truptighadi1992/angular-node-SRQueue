import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Injectable({providedIn : "root"})
export class AuthService {

    isUserAuthenticated:boolean = false;
    token:string;
    tokenTimer:any;
    loggedInUser:any;
    userAuthObservable = new Subject<boolean>();
    
    constructor( private http:HttpClient, private router: Router, private toastr:ToastrService ){}

    postSignUp(email: string, pwd: string, confirmpwd: string){

        const authData = { email : email, password: pwd, confirmPassword: confirmpwd};
        this.http.post('http://localhost:3000/api/auth/signup',authData)
        .subscribe( result =>{
            console.log(result);
            this.toastr.success('Signed up successfully!');
            this.router.navigate(['/login']);
        })
    }

    postLogin(email: string, pwd: string){

        const authData = { email : email, password: pwd};
        this.http.post<{ message:string, token: string, expiresIn: number, user: any }>('http://localhost:3000/api/auth/login',
        authData)
        .subscribe( authDataResult =>{

            console.log(authDataResult);
          
            this.token = authDataResult.token;
            if(this.token){
                    this.loggedInUser = authDataResult.user._id;
                    this.isUserAuthenticated = true;
                    const expiresInDuration = authDataResult.expiresIn;
                    this.setAuthTimer(expiresInDuration);
                    const now = new Date();
                    const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                    console.log(expirationDate);
                    this.saveAuthData(this.token, expirationDate,this.loggedInUser);
                    this.userAuthObservable.next(true);
                    this.router.navigate(["/"]);
                  
            } 
        },
        err =>{
            console.log(err); 
            this.logout();
            this.toastr.error(err.error.message, 'Login Failed');
        })
    }

    getLoggedInUser(){
        return this.loggedInUser;
    }

    autoAuthUser() {
        const authInformation = this.getAuthData();
        if (!authInformation) {
          return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
          this.token = authInformation.token;
          this.isUserAuthenticated = true;
          this.loggedInUser = authInformation.user;
          this.setAuthTimer(expiresIn / 1000);
          this.userAuthObservable.next(true);
        }
    }
    
    private setAuthTimer(duration: number) {
        console.log("Setting timer: " + duration);
        this.tokenTimer = setTimeout(() => {
          this.logout();
        }, duration * 1000);
    }

    private saveAuthData(token: string, expirationDate: Date, userId: string) {
        localStorage.setItem("token", token);
        localStorage.setItem("expiration", expirationDate.toISOString());
        localStorage.setItem("user", userId);
    }

    private clearAuthData() {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        localStorage.removeItem("user");
    }

    getAuthStatusListener() {
        return this.userAuthObservable.asObservable();
    }

    getUserAuthStatus(){
        return this.isUserAuthenticated;
    }

    getAuthData(){
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expiration");
        const user = localStorage.getItem("user");
        if (!token || !expirationDate || !user) {
          return;
        }
        return {
          token: token,
          expirationDate: new Date(expirationDate),
          user:user
        }
    }
    getAuthToken() {
        return this.token;
    }

    logout(){
        this.isUserAuthenticated = false;
        this.token = null;
        this.loggedInUser = null;
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.userAuthObservable.next(false);
        this.router.navigate(["/"]);
    }
}