
import { Component, ElementRef,OnInit,NgZone,ViewChild ,Input} from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { FormControl } from "@angular/forms";
import {GoogleplaceDirective} from './googleplace.directive';
//import { AgmCoreModule, MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-navbar',
  //directives: [GoogleplaceDirective],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // user:Object;
  // address:string;
  // searchAddress:string;

   listAddresses=[];
   mainaddress=[];
  
  //public searchControl: FormControl;

  constructor(private authService:AuthService,
  			  private flashMessage:FlashMessagesService,
  			  private router:Router) { }

  collapse: boolean = true;
  //  @ViewChild("search")
  // public searchElementRef: ElementRef;
   
  ngOnInit() {

    this.authService.getallAddresses().subscribe(data=>{
                      this.listAddresses=data.address
     });
   
  }

 

  onLogoutClick(){
  	this.authService.logout();
  	this.flashMessage.show('You are logged out', {
  				cssClass:'alert-success',
  				timeout:5000});

  	this.router.navigate(['/login']);
  	return false;
  }

  public address : Object;
  getAddress(place:Object) { 
          
             this.address = place['formatted_address'];
             var location = place['geometry']['location'];
             var lat =  location.lat();
             var lng = location.lng();
             console.log("Address Object", place,lat,lng);
             var locationAddress={
                formatted_address:this.address,
                latitude:lat,
                longitude:lng
             };
             console.log(locationAddress);


             if(this.authService.loggedIn()){
              this.authService.savePlace(locationAddress).subscribe(data=>{
                  console.log(data);
                  if(data.success){

                     this.flashMessage.show("Address saved in User address list",{
                      cssClass:'alert-success',
                      timeout:3000});
                     console.log("in navbar data",data.address);
                     //this.mainaddress=data.address;
                     // this.authService.getallAddresses().subscribe(data=>{
                      this.listAddresses=data.address;
                      window.location.reload(true);
                     // });
                      
                      //this.refreshData();
                      
                  }else{
                     this.flashMessage.show("Unable to list the addresses of user",{
                      cssClass:'alert-danger',
                      timeout:3000});
                  }

              });
             }
             
  }

  

}


