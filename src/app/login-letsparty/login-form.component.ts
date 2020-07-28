import { Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl , Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css'],


})
export class LoginFormComponent {


constructor(private router  : Router){

}

  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  submit(event : any) {
    let user = { username: this.form.value.username, password: this.form.value.password };
    if (this.form.valid) {
       localStorage.setItem('currentUser', JSON.stringify(user));
      this.router.navigate(['']);
     // this.submitEM.emit(this.form.value);
    }
  }
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();


  
}
