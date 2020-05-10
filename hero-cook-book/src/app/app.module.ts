import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularMaterialModule } from './angular-material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateSuperHeroComponent } from './create-super-hero/create-super-hero.component';
import { MySuperHeroesComponent } from './hero/my-super-heroes/my-super-heroes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LevelListComponent } from './level/level-list/level-list.component';
import { LevelComponent } from './level/level/level.component';
import { VillainComponent } from './villain/villain/villain.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    CreateSuperHeroComponent,
    MySuperHeroesComponent,
    LevelListComponent,
    LevelComponent,
    VillainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
