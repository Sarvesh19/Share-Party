import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare var require: any;
var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	user: any;

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
  distanceSelect = 0;
  campaignOne: FormGroup;
  isCompletedCountry = false;
  items = [];
  requestBtnLbl: string = 'Request';
  todayDate: Date = new Date();
  userLatitude :any;
  userLongitude :any;
  isMobile: boolean;

  getSliderTickInterval(): number | 'auto' {
    return;
  }
  loading = false;
  data: Array<object> = [];

  constructor(private router: Router) {
    this.todayDate = new Date();
      this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);


    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();


    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(year, month, today.getDate())),
      end: new FormControl(new Date(year, month, today.getDate() + 5))
    });

  }

  ngOnInit(): void { 
   this.userLatitude =  19.2657454;
   this.userLongitude = 72.9588941;

//     mapboxgl.accessToken = 'pk.eyJ1Ijoic2FydmVzaDMwNSIsImEiOiJja2RyZ2tlcDYwcGdpMnFwYjFuemw2azU5In0.5k8Drqkbja-0Vi1Ch1UcWg';
//     var map = new mapboxgl.Map({
//       container: 'map', // container id
//       style: 'mapbox://styles/mapbox/streets-v11',
//       center: [this.userLongitude,this.userLatitude], // starting position
//       zoom: 11.15 // starting zoom
//     });
//     // var marker = new mapboxgl.Marker()
//     //   .setLngLat([12.550343, 55.665957])
//     //   .addTo(map);


//     map.on('load', function() {


//        map.loadImage(
//       'assets/loc.png',
//       function(error, image) {
//         if (error) throw error;
//           map.addImage('cat', image);


//       map.addSource('places', {
//         'type': 'geojson',
//         'data': {
//           'type': 'FeatureCollection',
//           'features': [
//             {
//               'type': 'Feature',
//               'properties': {
//                 'description':
//                   '<strong>Make it Mount Pleasant</strong><p><a href="http://www.mtpleasantdc.com/makeitmtpleasant" target="_blank" title="Opens in a new window">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>',
//                 'icon': 'bar'
//               },
//               'geometry': {
//                 'type': 'Point',
//                 'coordinates': [72.9588941, 19.2657454]
//               }
//             },
//             {
//               'type': 'Feature',
//               'properties': {
//                 'description':
//                   '<strong>Mad Men Season Five Finale Watch Party</strong><p>Head to Lounge 201 (201 Massachusetts Avenue NE) Sunday for a <a href="http://madmens5finale.eventbrite.com/" target="_blank" title="Opens in a new window">Mad Men Season Five Finale Watch Party</a>, complete with 60s costume contest, Mad Men trivia, and retro food and drink. 8:00-11:00 p.m. $10 general admission, $20 admission and two hour open bar.</p>',
//                 'icon': 'theatre'
//               },
//               'geometry': {
//                 'type': 'Point',
//                 'coordinates': [72.958897,19.8657454]
//               }
//             },
//             {
//               'type': 'Feature',
//               'properties': {
//                 'description':
//                   '<strong>Big Backyard Beach Bash and Wine Fest</strong><p>EatBar (2761 Washington Boulevard Arlington VA) is throwing a <a href="http://tallulaeatbar.ticketleap.com/2012beachblanket/" target="_blank" title="Opens in a new window">Big Backyard Beach Bash and Wine Fest</a> on Saturday, serving up conch fritters, fish tacos and crab sliders, and Red Apron hot dogs. 12:00-3:00 p.m. $25.grill hot dogs.</p>',
//                 'icon': 'bar'
//               },
//               'geometry': {
//                 'type': 'Point',
//                 'coordinates': [71.958897,19.9657454]
//               }
//             },
//             {
//               'type': 'Feature',
//               'properties': {
//                 'description':
//                   '<strong>Ballston Arts & Crafts Market</strong><p>The <a href="http://ballstonarts-craftsmarket.blogspot.com/" target="_blank" title="Opens in a new window">Ballston Arts & Crafts Market</a> sets up shop next to the Ballston metro this Saturday for the first of five dates this summer. Nearly 35 artists and crafters will be on hand selling their wares. 10:00-4:00 p.m.</p>',
//                 'icon': 'art-gallery'
//               },
//               'geometry': {
//                 'type': 'Point',
//                 'coordinates': [71.958897,19.1157454]
//               }
//             },
//             {
//               'type': 'Feature',
//               'properties': {
//                 'description':
//                   '<strong>Seersucker Bike Ride and Social</strong><p>Feeling dandy? Get fancy, grab your bike, and take part in this year\'s <a href="http://dandiesandquaintrelles.com/2012/04/the-seersucker-social-is-set-for-june-9th-save-the-date-and-start-planning-your-look/" target="_blank" title="Opens in a new window">Seersucker Social</a> bike ride from Dandies and Quaintrelles. After the ride enjoy a lawn party at Hillwood with jazz, cocktails, paper hat-making, and more. 11:00-7:00 p.m.</p>',
//                 'icon': 'bicycle'
//               },
//               'geometry': {
//                 'type': 'Point',
//                 'coordinates': [-77.052477, 38.943951]
//               }
//             },
//             {
//               'type': 'Feature',
//               'properties': {
//                 'description':
//                   '<strong>Capital Pride Parade</strong><p>The annual <a href="http://www.capitalpride.org/parade" target="_blank" title="Opens in a new window">Capital Pride Parade</a> makes its way through Dupont this Saturday. 4:30 p.m. Free.</p>',
//                 'icon': 'rocket'
//               },
//               'geometry': {
//                 'type': 'Point',
//                 'coordinates': [-77.043444, 38.909664]
//               }
//             },
//             {
//               'type': 'Feature',
//               'properties': {
//                 'description':
//                   '<strong>Muhsinah</strong><p>Jazz-influenced hip hop artist <a href="http://www.muhsinah.com" target="_blank" title="Opens in a new window">Muhsinah</a> plays the <a href="http://www.blackcatdc.com">Black Cat</a> (1811 14th Street NW) tonight with <a href="http://www.exitclov.com" target="_blank" title="Opens in a new window">Exit Clov</a> and <a href="http://godsilla.bandcamp.com" target="_blank" title="Opens in a new window">Gods’illa</a>. 9:00 p.m. $12.</p>',
//                 'icon': 'music'
//               },
//               'geometry': {
//                 'type': 'Point',
//                 'coordinates': [-77.031706, 38.914581]
//               }
//             },
//             {
//               'type': 'Feature',
//               'properties': {
//                 'description':
//                   '<strong>A Little Night Music</strong><p>The Arlington Players\' production of Stephen Sondheim\'s  <a href="http://www.thearlingtonplayers.org/drupal-6.20/node/4661/show" target="_blank" title="Opens in a new window"><em>A Little Night Music</em></a> comes to the Kogod Cradle at The Mead Center for American Theater (1101 6th Street SW) this weekend and next. 8:00 p.m.</p>',
//                 'icon': 'music'
//               },
//               'geometry': {
//                 'type': 'Point',
//                 'coordinates': [-77.020945, 38.878241]
//               }
//             },
//             {
//               'type': 'Feature',
//               'properties': {
//                 'description':
//                   '<strong>Truckeroo</strong><p><a href="http://www.truckeroodc.com/www/" target="_blank">Truckeroo</a> brings dozens of food trucks, live music, and games to half and M Street SE (across from Navy Yard Metro Station) today from 11:00 a.m. to 11:00 p.m.</p>',
//                 'icon': 'music'
//               },
//               'geometry': {
//                 'type': 'Point',
//                 'coordinates': [-77.007481, 38.876516]
//               }
//             }
//           ]
//         }
//       });

//       // Add a layer showing the places.
//       map.addLayer({
//         'id': 'places',
//         'type': 'symbol',
//         'source': 'places',
//         'layout': {
//           'icon-image': 'cat',
//           'icon-allow-overlap': true,
//           'icon-size': 0.05
//         }
//       });



//       // When a click event occurs on a feature in the places layer, open a popup at the
//       // location of the feature, with description HTML from its properties.
//       map.on('click', 'places', function(e) {
//         var coordinates = e.features[0].geometry.coordinates.slice();
//         var description = e.features[0].properties.description;

//         // Ensure that if the map is zoomed out such that multiple
//         // copies of the feature are visible, the popup appears
//         // over the copy being pointed to.
//         while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
//           coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
//         }

//         new mapboxgl.Popup()
//           .setLngLat(coordinates)
//           .setHTML(description)
//           .addTo(map);
//       });

//       // Change the cursor to a pointer when the mouse is over the places layer.
//       map.on('mouseenter', 'places', function() {
//         map.getCanvas().style.cursor = 'pointer';
//       });

//       // Change it back to a pointer when it leaves.
//       map.on('mouseleave', 'places', function() {
//         map.getCanvas().style.cursor = '';
//       });
//     });
// });





















    if ((sessionStorage.getItem('start') || sessionStorage.getItem('end')) && sessionStorage.getItem('distance')) {
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
      setTimeout(() => {
        this.requestBtnLbl = 'Request';
      }, 5000);



		}
	}

	CreateParty() {
    this.router.navigate(['create-party']);

	}

	searchParty() {
    if(this.campaignOne.value !== null && this.campaignOne.value.start !== null){
        sessionStorage.setItem("start", this.campaignOne.value.start.toDate());
    }
    if(this.campaignOne.value !== null && this.campaignOne.value.end !== null && !isNaN(this.campaignOne.value.end)){
        sessionStorage.setItem("end", this.campaignOne.value.end.toDate());
    }
    sessionStorage.setItem("distance", this.distanceSelect + "");
    let endtime: any;
    if(this.campaignOne.value !== null && (this.campaignOne.value.end === null || isNaN(this.campaignOne.value.end))){
      endtime = null;
    } else {
      endtime = this.campaignOne.value.end.toDate();
    }
		this.router.navigate(['search-party'], {
      state: {
        startdate: this.campaignOne.value.start.toDate(), enddate: endtime,
        distance: this.distanceSelect
      }
    });
	} 




}
