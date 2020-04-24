import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SR-Queue';
  userAuth:boolean = false;
  subscription: Subscription;
  
  constructor(private authService:AuthService){}

  ngOnInit(){

    this.authService.autoAuthUser();

    this.userAuth = this.authService.getUserAuthStatus();
    this.subscription = this.authService.getAuthStatusListener().subscribe( authStatus =>{
      this.userAuth = authStatus;
    })
    
  }

  doLogout(){
    this.userAuth = false;
    this.authService.logout();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
