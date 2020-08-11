import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserLoginService } from '../user-login-service/user-detail.service';
import { Router, NavigationEnd } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ConfirmmodalComponent} from '../confirmmodal/confirmmodal.component';
import {RequestPartyComponent} from '../request-party/request-party.component';


@Component({
	selector: 'app-create-party',
	templateUrl: './create-party.component.html',
	styleUrls: ['./create-party.component.css']
})
export class CreatePartyComponent implements OnInit {

	latitude: any;
	longitude: any;
	datePicker : Date;
	isPartyCreated: boolean = false;
	isMobile : boolean = false;
    campaignOne: FormGroup;
    user: any;
	name: any;
  	color: any;


	constructor(private userLoginService: UserLoginService,private _snackBar: MatSnackBar,private router: Router,private dialog: MatDialog) { 

			this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

			const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();


    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(year, month, 13)),
      end: new FormControl(new Date(year, month, 16))
    });
}



	createParty: FormGroup = new FormGroup({
		party_theme: new FormControl(''),
		per_head: new FormControl('', Validators.required),
		total_participation: new FormControl('', Validators.required),
		address: new FormControl(''),
		description: new FormControl(''),

		party_date: new FormControl('', Validators.required),
		party_start: new FormControl(''),
		party_end: new FormControl(''),
		city: new FormControl('', Validators.required)

	});

	ngOnInit(): void {
		  this.user = JSON.parse(localStorage.getItem('currentUser'));

	}

	backToHome(){
	this.router.navigate(['']);
  }

	CreateParty(event: any) {
		if (!this.createParty.valid) {
			return;
		}
		//this.getLatitudeLong();
		this.isPartyCreated = true;

		if (window.navigator && window.navigator.geolocation) {
			window.navigator.geolocation.getCurrentPosition(
				position => {
					this.latitude = position.coords.latitude;
					this.longitude = position.coords.longitude;
					let createParty = { latitude: this.latitude, longitude: this.longitude };
					//createParty 
					console.info(this.datePicker);
					this.createParty.value.latitude = this.latitude;
					this.createParty.value.longitude = this.longitude;
					this.createParty.value.username = sessionStorage.username;
					// this.createParty.value.party_date = new Date(this.createParty.value.party_date);
					//console.info(this.createParty.value);
					this.userLoginService.createParty(this.createParty.value).subscribe((data: any) => {
						console.info(data);
						this.isPartyCreated = false;
						this.createParty.reset();

						this.openSnackBar("Party Created Successfylly","close");
					}, (error: any) => {
						this.isPartyCreated = false;
						if(error.error ==='Bad Token'){
              				this.sessionExpired();
            			}
						console.info(error);
					}
					)
				},
				error => {

					let createParty = { latitude: this.latitude, longitude: this.longitude };
					//createParty 
					this.createParty.value.latitude = this.latitude;
					this.createParty.value.longitude = this.longitude;
					this.createParty.value.username = sessionStorage.username;
					// this.createParty.value.party_date = new Date(this.createParty.value.party_date);

					//console.info(this.createParty.value);
					this.userLoginService.createParty(this.createParty.value).subscribe((data: any) => {
						console.info(data);
					this.isPartyCreated = false;
					//this.createParty.reset();
						//this.openSnackBar("Party Created Successfylly","close");

					}, (error: any) => {
						this.isPartyCreated = false;
 						if(error.error ==='Bad Token'){
              				this.sessionExpired();
            			} 
						console.info(error);
					}
					)

					switch (error.code) {
						case 1:
						   this.openDialog('permission_denied');

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

	public openSnackBar(message: string, action: string) {
		this._snackBar.open(message, action, {
			duration: 5000,
		});
	}

	getLatitudeLong() {
		if (window.navigator && window.navigator.geolocation) {
			window.navigator.geolocation.getCurrentPosition(
				position => {
					this.latitude = position.coords.latitude;
					this.longitude = position.coords.longitude;
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

	openDialog(name_ : any): void {
    const dialogRef = this.dialog.open(ConfirmmodalComponent, {
      width: '280px',
      data: { name: name_, color: this.color }
    });

    dialogRef.afterClosed().subscribe(res => {
      this.color = res;
    });
  }

  public sessionExpired() {
        // remove user from local storage to log user out
         sessionStorage.removeItem('start');
        sessionStorage.removeItem('end');
        sessionStorage.removeItem('distance');
        localStorage.removeItem('currentUser');
                sessionStorage.removeItem('token');

        sessionStorage.removeItem('username')
                this.router.navigate(['login']);



    }

}
