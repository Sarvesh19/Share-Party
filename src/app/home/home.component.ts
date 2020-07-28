import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormControl , Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	user : any;

	autoTicks = false;
  disabled = false;
  invert = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;
  vertical = false;
  tickInterval = 1;
  distanceSelect =0;
    campaignOne: FormGroup;
    isCompletedCountry = false;
    items = [];
    requestBtnLbl: string = 'Request';


  getSliderTickInterval(): number | 'auto' {
    return ;
  }
  loading = false;
  data: Array<object> = [];

  constructor(private router : Router) {
	const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();


    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(year, month, 13)),
      end: new FormControl(new Date(year, month, 16))
    });

   }

  ngOnInit(): void {


	//this.user = localStorage.getItem('currentUser');
	this.user = JSON.parse(localStorage.getItem('currentUser'));
	


	for (var i = 0; i < this.items.length; ++i) {
		//
	}
  }

  logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    

    


    @HostListener('document:click', ['$event']) onDocumentClick(event) {

		if (event.target.matches('.request')) {
			// alert('click to editor div');
			this.requestBtnLbl = 'Sent';
  			setTimeout(() => 
	 		{
    			this.requestBtnLbl = 'Request';
	 		},5000);



		}
	}

	CreateParty(){
		      this.router.navigate(['create-party']);

	}

	searchParty(){
		this.router.navigate(['search-party']);
	}




}
  