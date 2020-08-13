import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpClientModule, HTTP_INTERCEPTORS,HttpClientJsonpModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularMaterialModule } from './angular-module/material-module';
import { LoginFormComponent } from './login-letsparty/login-form.component'
import { MatCardModule } from '@angular/material/card';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule, WavesModule, ButtonsModule, InputsModule, IconsModule, CardsModule } from 'angular-bootstrap-md'
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HomeComponent } from './home/home.component';
import  {AuthGuard} from './authguard-service';
import {MatNativeDateModule} from '@angular/material/core';
import { CreatePartyComponent } from './create-party/create-party.component';
import { RequestPartyComponent } from './request-party/request-party.component';
import { RegisterComponent } from './register/register.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { BnNgIdleService } from 'bn-ng-idle';
import { ConfirmmodalComponent } from './confirmmodal/confirmmodal.component';
import { UserProfileComponent } from './user-profile/user-profile.component'; // import bn-ng-idle service
import { AuthHtppInterceptorService } from './auth-intercepter.service';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

 
@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    HomeComponent,
    CreatePartyComponent,
    RequestPartyComponent,
    RegisterComponent,
    ForgotpasswordComponent,
    ConfirmmodalComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    AngularMaterialModule,
    AppRoutingModule,
    FormsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MDBBootstrapModule.forRoot(),
        CheckboxModule, WavesModule, ButtonsModule, InputsModule, IconsModule, CardsModule
  ],
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthGuard,BnNgIdleService, {
    provide: HTTP_INTERCEPTORS, useClass: AuthHtppInterceptorService, multi: true
  },
{ provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
