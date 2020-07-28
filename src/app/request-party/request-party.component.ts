import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-party',
  templateUrl: './request-party.component.html',
  styleUrls: ['./request-party.component.css']
})
export class RequestPartyComponent implements OnInit {

  isCompletedCountry = false;
    items = [];
    data = [];

  constructor() { }

  ngOnInit(): void {

  	this.searchParty();
  }

  request(data :  any, index : number){
    	//this.loading = true;
    	data.btnLbl = "";
 		if(document.getElementById('btn_'+index).innerText == 'Request'){
			document.getElementById('btn_'+index).innerText = 'Sending...'; 
 		}else {
 			document.getElementById('btn_'+index).innerText = 'Request';
 		}


    	//as HTMLCollectionOf<HTMLElement>;

		setTimeout(() => 
	 		{
 			document.getElementById('btn_'+index).innerText = 'Sent';
 			document.getElementById('btn_'+index).style.backgroundColor =  '#ff4081';
	 		},1000);


    	setTimeout(() => 
	 		{
 			document.getElementById('btn_'+index).innerText = 'Request';
 			document.getElementById('btn_'+index).style.backgroundColor =  '#3f51b5';

	 		},3000);

	data.btnLbl = "Request";

    }


    searchParty(){

	this.isCompletedCountry = true;

	let data: Array<object> = [
    { name: 'Conor McGregor', Budget: '$21', Rating: 4.5, btnLbl : 'Request' },
    { name: 'Tony Ferguson', Budget: '$241', Rating: 5, btnLbl : 'Request' },
    { name: 'Max Holloway', Budget: '$121', Rating: 3.5, btnLbl : 'Request'},
    { name: 'Jon Jones', Budget: '$1', Rating: 4.5, btnLbl : 'Request' },
    { name: 'Daniel Cormier', Budget: '$251', Rating: 3 , btnLbl : 'Request'},
    { name: 'Brocky Lesnar', Budget: '$621', Rating: 5, btnLbl : 'Request'},
    { name: 'Conor McGregor', Budget: '$721', Rating: 3.5, btnLbl : 'Request' },
    { name: 'Tony Ferguson', Budget: '$921', Rating: 5 , btnLbl : 'Request'},
    { name: 'Max Holloway', Budget: '$421', Rating: 3, btnLbl : 'Request'},
    { name: 'Jon Jones', Budget: '$4421', Rating: 5 , btnLbl : 'Request'},
    { name: 'Daniely Cormier', Budget: '$521', Rating: 3, btnLbl : 'Request' },
    { name: 'Brock Lesnar', Budget: '$921', Rating: 3, btnLbl : 'Request'},
    { name: 'Conor McGregor', Budget: '$121', Rating: 5 , btnLbl : 'Request'},
    { name: 'ony Ferguson', Budget: '$31', Rating: 3.5 , btnLbl : 'Request'},
    { name: 'FMax Holloway', Budget: '$211', Rating: 4, btnLbl : 'Request'},
    { name: 'Jon Jones', Budget: '$213', Rating: 3 , btnLbl : 'Request'},
    { name: 'Daniel Cormier', Budget: '$215', Rating: 1 , btnLbl : 'Request'},
    { name: 'rock Lesnar', Budget: '$218', Rating: 3, btnLbl : 'Request'},
    { name: 'Tonor McGregor', Budget: '$219', Rating: 2.5, btnLbl : 'Request' },
    { name: 'Tony Ferguson', Budget: '$210', Rating: 3 , btnLbl : 'Request'},
    { name: 'Rax Holloway', Budget: '$421', Rating: 3, btnLbl : 'Request'},
    { name: 'Jon Jones', Budget: '$721', Rating: 4, btnLbl : 'Request'},
    { name: 'Daniel Cormier', Budget: '$921', Rating: 3 , btnLbl : 'Request'},
    { name: 'Brock Lesnar', Budget: '$281', Rating: 3, btnLbl : 'Request'},
    { name: 'Conor McGregor', Budget: '$21', Rating: 3 , btnLbl : 'Request'},
    { name: 'Eony Ferguson', Budget: '$21', Rating: 2 , btnLbl : 'Request'},
    { name: 'Max Holloway', Budget: '$801', Rating: 3, btnLbl : 'Request'},
    { name: 'Uon Jones', Budget: '$21', Rating: 3.5 , btnLbl : 'Request'},
    { name: 'Daniel Cormier', Budget: '$21', Rating: 3, btnLbl : 'Request' },
    { name: 'Brock Lesnar', Budget: '$921', Rating: 5, btnLbl : 'Request'},
    { name: 'Oonor McGregor', Budget: '$821', Rating: 3, btnLbl : 'Request' },
    { name: 'Tony Ferguson', Budget: '$221', Rating: 3 , btnLbl : 'Request'},
    { name: 'Lax Holloway', Budget: '$61', Rating: 3, btnLbl : 'Request'},
    { name: 'Fon Jones', Budget: '$51', Rating: 4 , btnLbl : 'Request'},
    { name: 'Raniel Cormier', Budget: '$821', Rating: 3.5 , btnLbl : 'Request'},
    { name: 'Wrock Lesnar', Budget: '$215', Rating: 2.5, btnLbl : 'Request'}
  ];
 //  setTimeout(() => 
	// {
 //   		this.data = data;
	// },5000);
  	this.data = data;
  	this.isCompletedCountry = false;



    }

}
