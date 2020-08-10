import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FormGroup, FormControl , Validators} from '@angular/forms';
import { UserLoginService } from '../user-login-service/user-detail.service';


@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private router : Router, private userLoginService : UserLoginService) { }

  passwordNotMatch :boolean= false;
  notFilled: boolean = false;
  wrongSecurity : boolean ;

  forgotPassForm: FormGroup = new FormGroup({
    securityAns1: new FormControl('', Validators.required),
    securityAns2: new FormControl('', Validators.required),
    confirmpassword: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
  }

  forgotPassword(event : any){
  		this.passwordNotMatch = false;
  		this.notFilled = false;
  	    if (this.forgotPassForm.valid ) {
			if(this.forgotPassForm.value.password !== this.forgotPassForm.value.confirmpassword){
				this.passwordNotMatch = true;
				return;
			} 
			this.forgotPassForm.value.password = btoa(this.forgotPassForm.value.password.trim());
			this.userLoginService.forgotPassword(this.forgotPassForm.value).subscribe((data: any)=>{
				console.info(data);
				sessionStorage.setItem('username',data.email);
          let tokenStr= 'Bearer '+data.firstName.split('-')[1];
          sessionStorage.setItem('token', tokenStr);
				 localStorage.setItem('currentUser', JSON.stringify(data));

				this.router.navigate(['']);
			},
      (err: any) => {
        //this.wrongPassword = true;
        console.info(err);
      //this.isSent = false;
      }

    )

  	    	console.info("valid.....");
  	    } else {
  	    	this.notFilled = true;
  	    }


  }

  register() {
    this.router.navigate(['register']);

  }

  loginRoute(){
  	    this.router.navigate(['login']);

  }

}
