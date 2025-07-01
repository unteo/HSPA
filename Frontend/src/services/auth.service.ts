import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  alertify: any;

constructor() { }

authUser(user: any){
  let UserArray = [];
  if(localStorage.getItem('Users')){
    UserArray = JSON.parse(localStorage.getItem('Users'));
  }
  return UserArray.find( p => p.userName === user.userName && p.password === user.password);

}

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  
}
