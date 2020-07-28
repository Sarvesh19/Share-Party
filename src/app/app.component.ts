import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, interval, of } from 'rxjs'
import { animate, state, style, transition, trigger } from '@angular/animations';

import { switchMap, catchError } from 'rxjs/operators'
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(200)
      ]),
      transition('* => void', [
        animate(200, style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  title = 'Share Party';

constructor(private router: Router){

}
  

  ngOnInit() {
    
  }

   logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
                this.router.navigate(['/login']);

    }

}
