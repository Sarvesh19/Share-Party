import { Component, OnInit } from '@angular/core';
import {UserLoginService} from '../user-login-service/user-detail.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
user: any;
public files: any[] = [];
  selectedFile: File;
  retrievedImage: any;
partyEntityList : any = [];
isEdit :boolean = false;
btnLabel = 'Edit';

  constructor(private userLoginService : UserLoginService,private router: Router) { }

  ngOnInit(): void {
  	if(localStorage.getItem('currentUser')){
  		this.user = JSON.parse(localStorage.getItem('currentUser'));

  		this.userLoginService.getUserDetail(this.user.email).subscribe((data : any)=> {
			this.partyEntityList = data.partyEntityList;
			if(data.user_img !== null){
			this.retrievedImage = 'data:image/jpeg;base64,' + data.user_img;
		}
  		},(error :any)=>{
  			if(error.error === 'Bad Token'){
  				this.router.navigate(['login']);
  			}
  			console.info(error);
  		})


  		this.userLoginService.getUserTest().subscribe((data :any)=>{
  			console.info(data);
  		},(error :any)=>{
  			console.info(error);
  		})
  	}
  }

  backToHome(){
	this.router.navigate(['']);
  }

  public onFileChanged(event) {

    this.selectedFile = event.target.files[0];

  }

onUpload() {
  const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.user.email);

  this.userLoginService.uploadProfileImg(uploadImageData).subscribe(data => {
  	console.info();
  	if(data.user_img !== null){
  	          this.retrievedImage = 'data:image/jpeg;base64,' + data.user_img;

  	}

  });
}

 rating( stars ) {
 	let elem = document.getElementById("rating1") as HTMLElement;
 	let cw = elem.clientWidth; // save original 100% pixel width

  document.getElementById("rating1").style.width = Math.round(cw * (stars / 5)) + 'px';
}

editUser(){

	if(this.isEdit){
		this.isEdit  =false	
		this.btnLabel = 'Edit';

	} else {
		this.isEdit  =true;
		this.btnLabel = 'Save';

	}


}

}
