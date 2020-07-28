import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
         let user = JSON.parse(localStorage.getItem('currentUser'));

        if (localStorage.getItem('currentUser') && user.username === 'sarvesh' && user.password==='12345') {

             //this.router.navigate(['test']);

            return true;
        }
         console.info("Not Authorized User !!!")

        // not logged in so redirect to login page with the return url
        //this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        this.router.navigate(['/login']);
        return false;
    }
}