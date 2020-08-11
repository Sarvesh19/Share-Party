import { Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginService } from '../user-login-service/user-detail.service';

import * as CryptoJS from 'crypto-js';  


@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],


})
export class LoginFormComponent {

  conversionEncryptPassWord : string;
  wrongPassword: boolean = false;
  mandatory : boolean  = false;
  showloggedIn : boolean = false;
    isMobile : boolean = false;
   loading : boolean;


  constructor(private router: Router, private userLoginService : UserLoginService) {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('token');
      this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
            position => {
               // this.geolocationPosition = position,
               //this.displayLocation(position.coords.latitude,position.coords.longitude);
                    console.log(position)
            },
            error => {
                switch (error.code) {
                    case 1:
                        console.log('Permission Denied');
                        break;
                    case 2:
                        console.log('Position Unavailable');
                        break;
                    case 3:
                        console.log('Timeout');
                        break;
                }
            }
        );
    };


  }


    displayLocation(latitude,longitude){
        var request = new XMLHttpRequest();

        var method = 'GET';
        var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&sensor=true';
        var async = true;

        request.open(method, url, async);
        request.onreadystatechange = function(){
          if(request.readyState == 4 && request.status == 200){
            var data = JSON.parse(request.responseText);
            var address = data.results[0];
            document.write(address.formatted_address);
          }
        };
        request.send();
      };

  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  submit(event: any) {
    this.wrongPassword = false;
    this.mandatory = false;
    this.loading = true;
    let user = { username: this.form.value.username, password: this.form.value.password };

   // this.conversionEncryptPassWord = CryptoJS.AES.encrypt("sarvesh", user.password.trim()).toString();  

    let userencrypt =  { username: this.form.value.username, password: btoa(user.password.trim()) };

    if (this.form.valid) {
      this.userLoginService.getUser(userencrypt).subscribe(data => {
      //this.trendTwitter = data.status;
      //this.isSent = true;
          this.loading = false;

          sessionStorage.setItem('username',data.email);
          let tokenStr= 'Bearer '+data.token;
          sessionStorage.setItem('token', tokenStr);
             localStorage.setItem('currentUser', JSON.stringify(data));

      this.router.navigate(['']); 

      console.info(data);
      
    },
      (err: any) => {
        this.wrongPassword = true;
        console.info(err);
        this.loading = false;
      //this.isSent = false;
      }

    )
      // this.submitEM.emit(this.form.value);
    } else {
      this.mandatory = true;
      this.loading = false;
    }
  }
  register() {
    this.router.navigate(['register']);

  }

  forgotPassoword(){
      this.router.navigate(['forgotpassword']);

  }

  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();




}
