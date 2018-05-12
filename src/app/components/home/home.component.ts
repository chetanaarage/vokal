import { Component, OnInit ,Input} from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService:AuthService,
  			  private flashMessage:FlashMessagesService,
  			  private router:Router) { }

  //addressArray=[];
  // @Input('address') address:String;

  @Input() addressArray :any[];


  ngOnInit() {

  	//console.log(this.addressArray);
  	this.authService.getallAddresses().subscribe(data=>{
  		console.log("data",data);
  		this.addressArray=data.address;
  		console.log("ins",this.addressArray);
  	});
  	
  }

   // ngOnChanges() {

  	// console.log("ins",this.addressArray);

   // // 	this.authService.getallAddresses().subscribe(data=>{
  	// // 	console.log("data",data);
  	// // 	this.addressArray=data.address;
  	// // 	console.log("ins",this.addressArray);
  	// // });

   // }

  // fetchallAddresses(){
  // 	this.authService.getallAddresses().subscribe(data=>{
  // 		console.log("data",data);
  // 		this.addresses=data.address;
  // 	});
  // }



}
