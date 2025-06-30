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

/**
   * Metoda pentru delogare. Șterge datele din localStorage.
   */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    this.alertify.success('You have been logged out!');
  }

  /**
   * Metoda care verifică, în orice componentă, dacă există un utilizator logat.
   * Se bazează pe prezența token-ului în localStorage.
   */
  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  /**
   * Metoda care returnează numele utilizatorului logat,
   * pentru a-l afișa (ex: "Welcome, John").
   */
  getLoggedInUsername(): string {
    return localStorage.getItem('userName');
  }
}
