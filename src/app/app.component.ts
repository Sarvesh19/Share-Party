import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, interval, of } from 'rxjs'
import { animate, state, style, transition, trigger } from '@angular/animations';

import { switchMap, catchError } from 'rxjs/operators'
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle'; // import it to your component
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ConfirmmodalComponent} from './confirmmodal/confirmmodal.component';

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
  name: any;
  color: any;
  showloggedIn :boolean = false;
    isOpen = false;


constructor(private router: Router,private bnIdle: BnNgIdleService,private dialog: MatDialog){

}
  

  ngOnInit() {

    if(localStorage.getItem('currentUser')){
      this.showloggedIn  =true;
    }

     this.bnIdle.startWatching(60*15).subscribe((isTimedOut: boolean) => {
      if (isTimedOut && sessionStorage.getItem('username')) {
         localStorage.removeItem('currentUser');
         localStorage.removeItem('username')
         sessionStorage.removeItem('start');
        sessionStorage.removeItem('end');
        sessionStorage.removeItem('distance');
        localStorage.removeItem('start');
        localStorage.removeItem('end');
        localStorage.removeItem('distance');
         //this.openDialog();
         this.router.navigate(['login']);
         this.showloggedIn  =true;
        console.log('session expired');
      }
    });
    
  }

   logout() {
        // remove user from local storage to log user out
         sessionStorage.removeItem('start');
        sessionStorage.removeItem('end');
        sessionStorage.removeItem('distance');
        localStorage.removeItem('currentUser');
                sessionStorage.removeItem('token');
                localStorage.removeItem('start');
        localStorage.removeItem('end');
        localStorage.removeItem('distance');

        localStorage.removeItem('username')
                this.router.navigate(['login']);



    }

    routeToLogin(){
      this.router.navigate(['']);
    }
    home(){
          this.router.navigate(['']);
  
    }

    openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmmodalComponent, {
      width: '280px',
      data: { name: this.name, color: this.color }
    });

    dialogRef.afterClosed().subscribe(res => {
      this.color = res;
    });
  }
  userProfile(){
    this.isOpen = !this.isOpen;
          this.router.navigate(['user-profile']);

  
}

ngDoCheck() {
  if(window.location.pathname === '/login' || window.location.pathname === '/register' || window.location.pathname === '/forgotpassword'){
      this.showloggedIn  =false;
    } else {
      this.showloggedIn  =true;

    }

}

}
