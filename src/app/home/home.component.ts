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
    todayDate:Date = new Date();

  getSliderTickInterval(): number | 'auto' {
    return ;
  }
  loading = false;
  data: Array<object> = [];

  constructor(private router : Router) {
    this.todayDate = new Date();


	const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();


    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(year, month, today.getDate())),
      end: new FormControl(new Date(year, month, today.getDate() +5))
    });

   }

  ngOnInit(): void {
    if((sessionStorage.getItem('start') || sessionStorage.getItem('end'))  && sessionStorage.getItem('distance')){
      // this.campaignOne.value.start = ;
      // this.campaignOne.value.end = ;

    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(Date.parse(sessionStorage.getItem('start')))),
      end: new FormControl(new Date(Date.parse(sessionStorage.getItem('end'))))
    });


      this.distanceSelect = +sessionStorage.getItem('distance');
    }


	//this.user = localStorage.getItem('currentUser');
	this.user = JSON.parse(localStorage.getItem('currentUser'));
	


	for (var i = 0; i < this.items.length; ++i) {
		//
	}
  }

  logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        sessionStorage.removeItem('start');
        sessionStorage.removeItem('end');
        sessionStorage.removeItem('distance');

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
        sessionStorage.setItem("start",this.campaignOne.value.start);
        sessionStorage.setItem("end",this.campaignOne.value.end);
        sessionStorage.setItem("distance",this.distanceSelect+"");

		this.router.navigate(['search-party'], { 
        state: { startdate: this.campaignOne.value.start, enddate : this.campaignOne.value.end,
        distance : this.distanceSelect} 
    });
	}




}
  