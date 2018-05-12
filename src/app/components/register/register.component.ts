import { Component, OnInit } from '@angular/core';
//import {ValidateService} from '../../services/validate.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
	firstname:String;
	lastname:String;
	username:String;
	email:String;
	password:String;
   
		
  constructor(private authService:AuthService,
  		      private flashMessage:FlashMessagesService,
  		      private router:Router) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
  
  	
  	const user={
  		firstname:this.firstname,
  		lastname:this.lastname,
  		email:this.email,
  		username:this.username,
  		password:this.password
  	}

  	console.log("onRegisterSubmit",user);
  	//Required fields
  	// if(!this.validateService.validateRegister(user)){
  	// 	this.flashMessage.show("Please fill in all fields",{cssClass:'alert-danger',timeout:3000});
  	// 	return false;
  	// }
  	//Validate email
  	// if(!this.validateService.validateEmail(user.email)){
  	// 	this.flashMessage.show("Please enter a valid email",{cssClass:'alert-danger',timeout:3000});
  	// 	return false;
  	// }

  	//Register User
  	this.authService.registerUser(user).subscribe( data=>{
  		if(data.success){
  			this.flashMessage.show("Registered successfully,,!! You can login now..",{cssClass:'alert-success',timeout:3000});
  			this.router.navigate(['/login']);
  		}else{
  			this.flashMessage.show("Something went wrong..!!",{cssClass:'alert-danger',timeout:3000});
  			this.router.navigate(['/register']);
  		
  		}
  	});

  }

}
