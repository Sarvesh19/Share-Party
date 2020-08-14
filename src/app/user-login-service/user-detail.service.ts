import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';





@Injectable({
  providedIn: 'root'
})

export class UserLoginService {
//Original
//https://us1.locationiq.com/v1/reverse.php?key=3ce5c0302fb087&lat=19.267584&lon=72.9612288&format=json

//Alternative.  
//private baseUri = "https://toptrending-alt-spring.herokuapp.com/getTrending/";


//private baseUri ="http://localhost:8080/"; 
private baseUri = "https://shareparty.herokuapp.com/";
  //private herokuURL = 'https://toptrendingnow.herokuapp.com/getTrending/'; 

  //private herokuURLBollwyood = 'https://toptrendingnow.herokuapp.com/bollywoodtrends'; 
  // private localBollwyood= "http://localhost:5050/bollywoodtrends/bollykoi";
 // private localURL = 'http://localhost:5050/getTrending/'
  private params: any;
  private options: any;

  //private countryCodeURL = "http://ip-api.com/json";
  //3.80.226.201
  constructor(private http: HttpClient) { }


  getUser(user: any): Observable<any> {
    return this.http.post(this.baseUri + 'loginuser' , user);
  }
  
  registerUser(userDetail: any): Observable<any> {
    return this.http.post(this.baseUri + 'registeruser', userDetail);

  }

  forgotPassword(userForgotPass: any): Observable<any> {
       return this.http.post(this.baseUri + 'forgotpassword', userForgotPass);
 
  }

  getUserTest(): Observable<any>{
        return this.http.get(this.baseUri +'test');

  }

  uploadProfileImg(formData : any): Observable<any>{
      return this.http.post(this.baseUri +'uploadimg', formData);

  }
  getUserDetail(username : any): Observable<any>{
       return this.http.post(this.baseUri + 'userdetail', username);

  }

  createParty(formData): Observable<any>{
       return this.http.post(this.baseUri + 'createParty', formData);

  }

  searchParty(searchData): Observable<any>{
       return this.http.post(this.baseUri + 'searchParty', searchData);

  }

requestParty(requestData): Observable<any>{
       return this.http.post(this.baseUri + 'requestParty', requestData);

  }






}