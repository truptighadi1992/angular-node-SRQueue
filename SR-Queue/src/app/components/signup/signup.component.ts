import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  doSignUp(signupForm : NgForm){
    if(signupForm.invalid){
      return;
    }
    const email = signupForm.value.email;
    const password = signupForm.value.pwd;
    const confirmPassword = signupForm.value.confirmpwd;
    
    this.authService.postSignUp(email,password,confirmPassword);
  }
}
