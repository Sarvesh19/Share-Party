import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserLoginService } from '../user-login-service/user-detail.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ConfirmmodalComponent} from '../confirmmodal/confirmmodal.component';

@Component({
  selector: 'app-request-party',
  templateUrl: './request-party.component.html',
  styleUrls: ['./request-party.component.css']
})
export class RequestPartyComponent implements OnInit {

  isPartyCreated:boolean = false;
  items = [];
  data = [];
  campaignOne: FormGroup;
  user: any;
  distance : any;
  startDate: Date;
  endDate: Date;
  name: any;
  color: any;
  //isPartyCreated :boolean;
  noData :boolean;
  loading: boolean = false;

  constructor(private router: Router, private userLoginService: UserLoginService
  ,private dialog: MatDialog) {
    this.loading = true;
        this.isPartyCreated = true;
        this.noData = false;

    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(year, month, 13)),
      end: new FormControl(new Date(year, month, 16))
    });
    if(this.router.getCurrentNavigation().extras !== undefined && this.router.getCurrentNavigation().extras.state !== undefined){
      this.distance = this.router.getCurrentNavigation().extras.state.distance;
      this.startDate = this.router.getCurrentNavigation().extras.state.startdate;
      this.endDate = this.router.getCurrentNavigation().extras.state.enddate;
    }
    this.router.getCurrentNavigation().extras.state;   

  }

  ngOnInit(): void {
  this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.searchParty();
  }

  request(data: any, index: number) {
    //this.loading = true;
    data.btnLbl = "";
    if (document.getElementById('btn_' + index).innerText == 'Request') {
			document.getElementById('btn_' + index).innerText = 'Sending...';
    } else {
      document.getElementById('btn_' + index).innerText = 'Request';
    }


    //as HTMLCollectionOf<HTMLElement>;

		setTimeout(() => {
      document.getElementById('btn_' + index).innerText = 'Sent';
      document.getElementById('btn_' + index).style.backgroundColor = '#ff4081';
    }, 1000);


    setTimeout(() => {
      document.getElementById('btn_' + index).innerText = 'Request';
      document.getElementById('btn_' + index).style.backgroundColor = '#3f51b5';

    }, 3000);

    data.btnLbl = "Request";

  }


  searchParty() {
        this.noData = false;
        this.loading = true;
            this.isPartyCreated = true;


    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
        this.isPartyCreated = true;
        let partySearch ;
           if((sessionStorage.getItem('start') || sessionStorage.getItem('end'))  && sessionStorage.getItem('distance')){

             partySearch = {username: this.user.email,distance :+sessionStorage.distance,latitude :position.coords.latitude,
                startDate : new Date(Date.parse(sessionStorage.getItem('start'))),endDate : new Date(Date.parse(sessionStorage.getItem('end'))),longitude :position.coords.longitude };
           }else {
               partySearch = {username: this.user.email,distance :this.distance,latitude :position.coords.latitude,
                startDate : this.startDate,endDate : this.endDate,longitude :position.coords.longitude };
           }

           // sessionStorage.username;
          // this.createParty.value.party_date = new Date(this.createParty.value.party_date);
          //console.info(this.createParty.value);
          this.userLoginService.searchParty(partySearch).subscribe((data: any) => {
            console.info(data);
            this.loading = false;
            this.isPartyCreated = false;
            this.data = data;

            if(data == null){
              this.noData = true;
            }
            //this.openSnackBar("Party Created Successfylly","close");
          }, (error: any) => {
            this.isPartyCreated = false;
            if(error.error ==='Bad Token'){
              this.sessionExpired();
            } else {
            this.noData = true;

            }
          this.loading = false;

            console.info(error);
          }
          )
        },
        error => {
           this.isPartyCreated = true;
          
           // sessionStorage.username;
          let partySearch = {username: this.user.email,distance :this.distance,startDate : this.startDate,endDate : this.endDate};
          this.userLoginService.searchParty(partySearch).subscribe((data: any) => {
            console.info(data);
            this.data = data;
            this.loading = false;
             if(data == null){
              this.noData = true;
            }
          this.isPartyCreated = false;

          }, (error: any) => {
            this.isPartyCreated = false;

            this.loading = false;
            if(error.error ==='Bad Token'){
              this.sessionExpired();
            } else {
            this.noData = true;

            }
            console.info(error);
          }
          )

          switch (error.code) {
            case 1:
              console.log('Permission Denied');
              this.openDialog('permission_denied');
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

    // this.userLoginService.searchParty().subscribe(data => {
 
    //   // sessionStorage.setItem('username',data.email);
    //   //     let tokenStr= 'Bearer '+data.firstName.split('-')[1];
    //   //     sessionStorage.setItem('token', tokenStr);
    //   //        localStorage.setItem('currentUser', JSON.stringify(data));


    //   console.info(data);
      
    // },
    //   (err: any) => {
    //     console.info(err);
    //   }

    // )
    
    // this.data = data;
    this.isPartyCreated = false;



  }

  backToHome(){
  this.router.navigate(['']);
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



// let data: Array<object> = [
//       { name: 'Conor McGregor', Budget: '$21', Rating: 4.5, btnLbl: 'Request' },
//       { name: 'Tony Ferguson', Budget: '$241', Rating: 5, btnLbl: 'Request' },
//       { name: 'Max Holloway', Budget: '$121', Rating: 3.5, btnLbl: 'Request' },
//       { name: 'Jon Jones', Budget: '$1', Rating: 4.5, btnLbl: 'Request' },
//       { name: 'Daniel Cormier', Budget: '$251', Rating: 3, btnLbl: 'Request' },
//       { name: 'Brocky Lesnar', Budget: '$621', Rating: 5, btnLbl: 'Request' },
//       { name: 'Conor McGregor', Budget: '$721', Rating: 3.5, btnLbl: 'Request' },
//       { name: 'Tony Ferguson', Budget: '$921', Rating: 5, btnLbl: 'Request' },
//       { name: 'Max Holloway', Budget: '$421', Rating: 3, btnLbl: 'Request' },
//       { name: 'Jon Jones', Budget: '$4421', Rating: 5, btnLbl: 'Request' },
//       { name: 'Daniely Cormier', Budget: '$521', Rating: 3, btnLbl: 'Request' },
//       { name: 'Brock Lesnar', Budget: '$921', Rating: 3, btnLbl: 'Request' },
//       { name: 'Conor McGregor', Budget: '$121', Rating: 5, btnLbl: 'Request' },
//       { name: 'ony Ferguson', Budget: '$31', Rating: 3.5, btnLbl: 'Request' },
//       { name: 'FMax Holloway', Budget: '$211', Rating: 4, btnLbl: 'Request' },
//       { name: 'Jon Jones', Budget: '$213', Rating: 3, btnLbl: 'Request' },
//       { name: 'Daniel Cormier', Budget: '$215', Rating: 1, btnLbl: 'Request' },
//       { name: 'rock Lesnar', Budget: '$218', Rating: 3, btnLbl: 'Request' },
//       { name: 'Tonor McGregor', Budget: '$219', Rating: 2.5, btnLbl: 'Request' },
//       { name: 'Tony Ferguson', Budget: '$210', Rating: 3, btnLbl: 'Request' },
//       { name: 'Rax Holloway', Budget: '$421', Rating: 3, btnLbl: 'Request' },
//       { name: 'Jon Jones', Budget: '$721', Rating: 4, btnLbl: 'Request' },
//       { name: 'Daniel Cormier', Budget: '$921', Rating: 3, btnLbl: 'Request' },
//       { name: 'Brock Lesnar', Budget: '$281', Rating: 3, btnLbl: 'Request' },
//       { name: 'Conor McGregor', Budget: '$21', Rating: 3, btnLbl: 'Request' },
//       { name: 'Eony Ferguson', Budget: '$21', Rating: 2, btnLbl: 'Request' },
//       { name: 'Max Holloway', Budget: '$801', Rating: 3, btnLbl: 'Request' },
//       { name: 'Uon Jones', Budget: '$21', Rating: 3.5, btnLbl: 'Request' },
//       { name: 'Daniel Cormier', Budget: '$21', Rating: 3, btnLbl: 'Request' },
//       { name: 'Brock Lesnar', Budget: '$921', Rating: 5, btnLbl: 'Request' },
//       { name: 'Oonor McGregor', Budget: '$821', Rating: 3, btnLbl: 'Request' },
//       { name: 'Tony Ferguson', Budget: '$221', Rating: 3, btnLbl: 'Request' },
//       { name: 'Lax Holloway', Budget: '$61', Rating: 3, btnLbl: 'Request' },
//       { name: 'Fon Jones', Budget: '$51', Rating: 4, btnLbl: 'Request' },
//       { name: 'Raniel Cormier', Budget: '$821', Rating: 3.5, btnLbl: 'Request' },
//       { name: 'Wrock Lesnar', Budget: '$215', Rating: 2.5, btnLbl: 'Request' }
//     ];
openDialog(name_ : any): void {
    const dialogRef = this.dialog.open(ConfirmmodalComponent, {
      width: '280px',
      data: { name: name_, color: this.color }
    });

    dialogRef.afterClosed().subscribe(res => {
      this.color = res;
    });
  }


}
