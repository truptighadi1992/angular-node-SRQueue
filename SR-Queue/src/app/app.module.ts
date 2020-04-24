import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CreateSrComponent } from './components/create-sr/create-sr.component';
import { SrListComponent } from './components/sr-list/sr-list.component';
import { AuthInterceptor} from './auth/auth.interceptor';
import { CaseService } from './services/case.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    CreateSrComponent,
    SrListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbPaginationModule
  ],
  providers: [ 
    CaseService,
    {
    provide:HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
