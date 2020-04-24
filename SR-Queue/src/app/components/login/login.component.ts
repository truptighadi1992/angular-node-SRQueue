import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  doLogin(loginForm : NgForm){
    
    if(loginForm.invalid){
      return;
    }
    const email = loginForm.value.email;
    const password = loginForm.value.pwd;
  
    this.authService.postLogin(email,password);
  }
}
