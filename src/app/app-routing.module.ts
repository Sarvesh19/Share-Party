import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import { LoginFormComponent } from './login-letsparty/login-form.component';
import {AuthGuard} from './authguard-service';
import { CreatePartyComponent } from './create-party/create-party.component';
import { RequestPartyComponent } from './request-party/request-party.component';



const routes: Routes = [
	{ path: 'login', component: LoginFormComponent },

    // home route protected by auth guard
    { path: '', component: HomeComponent, canActivate: [AuthGuard],
 	children: [
      { path: 'create-party', component: CreatePartyComponent },
      { path: 'search-party', component: RequestPartyComponent }
    ]
     },

    // { path: 'test', component: HomeComponent },


    // otherwise redirect to home
    { path: '**', redirectTo: '' }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
