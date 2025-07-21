import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserForLogin, UserForRegister } from 'src/app/model/user';
import { environment } from 'src/environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  alertify: any;
  baseUrl = environment.baseUrl;

constructor(private http: HttpClient) { }

authUser(user: UserForLogin){
  return this.http.post(this.baseUrl + '/account/login', user);

}

registerUser(user : UserForRegister) {
  return this.http.post(this.baseUrl + '/account/register', user);
}


  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  getCompanyId(): string | null {
  const token = localStorage.getItem('token');
  if (token) {
    const decoded: any = jwtDecode(token);
    return decoded.CompanyId || null;
  }
  return null;
}

}
