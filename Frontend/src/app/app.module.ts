import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { PropertyCardComponent } from './property/property-card/property-card.components';
import { PropertyListComponent } from './property/property-list/property-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HousingService } from 'src/services/housing.service';
import { AddPropertyComponent } from './property/add-property/add-property.component';
import { PropertyDetailComponent } from './property/property-detail/property-detail.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserLoginComponent } from './user/user-login/user-login.component';

const appRoutes: Routes =[
 { path: '', component : PropertyListComponent },
 { path: 'rent-property', component : PropertyListComponent },
 { path: 'add-property', component : AddPropertyComponent },
 { path: 'property-detail/:id', component : PropertyDetailComponent },
 { path: 'user/login', component: UserLoginComponent},
 { path: 'user/register', component: UserRegisterComponent},
 { path: '**', component : PropertyListComponent },


]

@NgModule({
  declarations: [	
    AppComponent,
    PropertyCardComponent,
    PropertyListComponent,
    NavBarComponent,
    AddPropertyComponent,
    PropertyDetailComponent,
    UserRegisterComponent,
    UserLoginComponent,
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    HousingService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
