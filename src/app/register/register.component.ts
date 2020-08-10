import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl , Validators} from '@angular/forms';
import { UserLoginService } from '../user-login-service/user-detail.service';
import { Router, NavigationEnd } from '@angular/router';

import * as CryptoJS from 'crypto-js';  


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	@ViewChild('recaptcha', {static: true }) recaptchaElement: ElementRef;
  constructor(private userLoginService : UserLoginService,private router: Router) { }
  notFilled : boolean = false;

   register: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    user_city: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    security1_ans: new FormControl('', Validators.required),
    security2_ans: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
	user_number: new FormControl('')
    

  });

  ngOnInit(): void {
  	    this.addRecaptchaScript();

  }
  //Use this secret key for communication between your site and reCAPTCHA.

//   6LdqsroZAAAAAHLxGAU8xBmjCeikElnqzGkEjcuj
  renderReCaptch() {
    window['grecaptcha'].render(this.recaptchaElement.nativeElement, {
      'sitekey' : '6LdqsroZAAAAAFGhj-rq_waaX_urds-Ak3myomdV',
      'callback': (response) => {
          console.log(response);
      }
    });
  }
  addRecaptchaScript() {
 
    window['grecaptchaCallback'] = () => {
      this.renderReCaptch();
    }
 
    (function(d, s, id, obj){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { obj.renderReCaptch(); return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://www.google.com/recaptcha/api.js?onload=grecaptchaCallback&amp;render=explicit";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'recaptcha-jssdk', this));
 
  }

  registerFunc(event : any){
  		this.notFilled = false;
  	    //this.register.value.password = CryptoJS.AES.encrypt("sarvesh", this.register.value.password.trim()).toString();  
 
  	    if(!this.register.valid){
  	    	this.notFilled = true;
  	    	return ;
  	    }

  	    this.register.value.password = btoa(this.register.value.password.trim());  

  	this.userLoginService.registerUser(this.register.value).subscribe(data => {
			//this.trendTwitter = data.status;
			//this.isSent = true;
			sessionStorage.setItem('username',data.email);
          let tokenStr= 'Bearer '+data.token;
          sessionStorage.setItem('token', tokenStr);
			       localStorage.setItem('currentUser', JSON.stringify(data));

			this.router.navigate(['']);

			console.info(data);
			
		},
			(err: any) => {
				console.info(err);
			//this.isSent = false;
			}

		)
  }
  	

}
