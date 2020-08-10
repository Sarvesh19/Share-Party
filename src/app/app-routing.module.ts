import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import { LoginFormComponent } from './login-letsparty/login-form.component';
import {AuthGuard} from './authguard-service';
import { CreatePartyComponent } from './create-party/create-party.component';
import { RequestPartyComponent } from './request-party/request-party.component';
import {RegisterComponent} from './register/register.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import  { UserProfileComponent } from './user-profile/user-profile.component';



const routes: Routes = [
	{ path: 'login', component: LoginFormComponent },

    // home route protected by auth guard
    { path: '', component: HomeComponent, canActivate: [AuthGuard]},
 	
      { path: 'create-party', component: CreatePartyComponent },
      { path: 'search-party', component: RequestPartyComponent },
    
    

     { path: 'register', component: RegisterComponent },

     { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },

     

     { path: 'forgotpassword', component: ForgotpasswordComponent },
     

   //    { path: '', component: HomeComponent, canActivate: [AuthGuard],
   // children: [
   //    { path: 'create-party', component: CreatePartyComponent },
   //    { path: 'search-party', component: RequestPartyComponent }
   //  ]
   //   }


    // otherwise redirect to home
    { path: '**', redirectTo: '' }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
