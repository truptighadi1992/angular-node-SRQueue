import { Injectable } from "@angular/core";
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { promise } from 'protractor';

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private authService:AuthService, private router:Router){}

    canActivate( route: ActivatedRouteSnapshot , state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

        const isAuth = this.authService.getUserAuthStatus();
        if(!isAuth){
            this.router.navigate(['/login']);
        }
        return isAuth;

    }
}