import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA,Injectable } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {AuthGuard} from './guards/auth.guard';
import {RouterModule,Routes} from '@angular/router';

import {FlashMessagesModule} from 'angular2-flash-messages';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {AuthService} from './services/auth.service';
import { ProfileComponent } from './components/profile/profile.component';
import {GooglePlaceModule} from 'ng2-google-place-autocomplete';
import {GoogleplaceDirective} from './components/navbar/googleplace.directive';
//import { HomeComponent } from './home/home.component';
import { HomeComponent } from './components/home/home.component';

//import { AgmCoreModule } from '@agm/core';
//import { LAZY_MAPS_API_CONFIG } from 'angular2-google-maps/core/services';
const appRoutes:Routes=[
  //{path:'',component:NavbarComponent},
  //{path:'',component:HomeComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]}

]

// @Injectable()
// export class GoogleMapsConfig {
//   apiKey: string;
//   constructor() {
//     this.apiKey = 'AIzaSyDlzBmihV6k0nwTnEUe-NKDLtQUBT7CaP8';
//   }
// }


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
     GoogleplaceDirective,
    ProfileComponent,
    HomeComponent
  ],
  imports: [
     //AgmCoreModule.forRoot(),//    {apiKey: 'AIzaSyDlzBmihV6k0nwTnEUe-NKDLtQUBT7CaP8',libraries: ["places"]}
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    GooglePlaceModule
  ],
  providers: [AuthService,AuthGuard],
   //providers: [{provide: LAZY_MAPS_API_CONFIG, useClass: GoogleMapsConfig}], 
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
