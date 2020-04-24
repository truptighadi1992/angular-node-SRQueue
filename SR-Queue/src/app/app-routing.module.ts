import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CreateSrComponent } from './components/create-sr/create-sr.component';
import { SrListComponent } from './components/sr-list/sr-list.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path:'login',
    component :LoginComponent
  },
  {
    path:'signup',
    component :SignupComponent
  },
  {
    path:'createsr',
    component :CreateSrComponent,
    canActivate : [AuthGuard]
  },
  {
    path:'editsr/:srId',
    component :CreateSrComponent,
    canActivate : [AuthGuard]
  },
  {
    path:'home',
    component :SrListComponent
  },
  {
    path:'',
    redirectTo:'home', 
    pathMatch:'full'
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
