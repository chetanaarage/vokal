  import { Component, OnInit } from '@angular/core';
  import {FlashMessagesService} from 'angular2-flash-messages';
  import {AuthService} from '../../services/auth.service';
  import {Router} from '@angular/router';


  @Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })
  export class LoginComponent implements OnInit {
  	username:String;
  	password:String;

    constructor(private authService:AuthService,
    			  private flashMessage:FlashMessagesService,
    			  private router:Router) { }

    ngOnInit() {

    }
    onLoginSubmit(){
      console.log("onLoginSubmit");
    	const user={
    		username:this.username,
    		password:this.password
    	}

    	this.authService.authenticateUser(user).subscribe(data=>{
    		if(data.success){
    			this.authService.storeUserData(data.token,data.user);
    			this.flashMessage.show('Logged in successfully',{
    				cssClass:'alert-success',
    				timeout:5000});
    			this.router.navigate(['/']);

    		}else{
    			this.flashMessage.show(data.msg,{
    				cssClass:'alert-danger',
    				timeout:5000});
    			this.router.navigate(['/login']);
    		}
    	});
    }

  }
