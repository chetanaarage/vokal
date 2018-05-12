import { Injectable } from '@angular/core';
import {Http,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class AuthService {
	authToken:any;
	user:any;

private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
 private options = new RequestOptions({ headers: this.headers });

  constructor(private http:Http) { }
  addressesChanged=new Subject<any>();
  registerUser(user){

    console.log("in authenticate service register",user);
  	let headers=new Headers();
  	headers.append('Content-Type','application/json');
  	return this.http.post('users/register',user,{headers:headers})
  				.map(res=>res.json());
  }

  authenticateUser(user){
    console.log("in authenticate service login",user);
  	let headers=new Headers();
  	headers.append('Content-Type','application/json');
  	return this.http.post('users/authenticate',user,{headers:headers})
  				.map(res=>res.json());
  }

  forgottenPasswordUser(user){
    console.log('in AuthService forgotten forgottenPassword',user);
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('users/forgottenPassword',user,{headers:headers})
                .map(res=>res.json());
  }


  resetPassword(user){
    console.log("in resetPassword service ",user.token);
    // let token=user.token;
    // console.log("user.token",token);
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    let options = new RequestOptions({ headers: headers });

    //let body = JSON.stringify(user);
    //console.log("body.token",body.token);
    return this.http.post('reset/'+user.token,user,options)
                .map(res=>res.json());
  }


  getProfile(){
  	let headers=new Headers();
  	this.loadToken();
  	headers.append('Authorization',this.authToken);
  	headers.append('Content-Type','application/json');
  	return this.http.get('users/profile',{headers:headers})
  				.map(res=>res.json());
  }

  getAddress(address){
    console.log("in authenticate service address search",address);
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('users/getAddress',address,{headers:headers}).map(res=>res.json());
  }

  savePlace(locationAddress){
    console.log("in authenticate service save searched place",locationAddress);
    let headers=new Headers();
    this.loadToken();
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.post('users/saveAddress',locationAddress,{headers:headers}).map(res=>res.json());
     //this.addressesChanged.next(this.getallAddresses);
  }

  getallAddresses(){
    let headers=new Headers();
    this.loadToken();
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('users/getallAddress',{headers:headers})
          .map(res=>res.json());
  }

  storeUserData(token,user){
  	localStorage.setItem('id_token',token);
  	localStorage.setItem('user',JSON.stringify(user));
  	this.authToken=token;
  	this.user=user;
  }

  loadToken(){
  	const token=localStorage.getItem('id_token');
  	this.authToken=token;
  }

  loggedIn(){
  	return tokenNotExpired('id_token');
  }

  logout(){
  	this.authToken=null;
  	this.user=null;
  	localStorage.clear();
  }



}
