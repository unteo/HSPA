import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserForLogin } from 'src/app/model/user';
import { AlertifyService } from 'src/services/alertify.service';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor( private authService: AuthService,
               private alertyfy: AlertifyService,
               private router: Router
  ) { }

  ngOnInit() {
  }

  onLogin(loginForm: NgForm){
    console.log(loginForm.value);
    this.authService.authUser(loginForm.value).subscribe(
      (response: UserForLogin) =>{
        console.log(response);
        const user = response;
      localStorage.setItem('token', user.token);
      localStorage.setItem('userName', user.userName);
      this.alertyfy.success('Login Succsessful');
      this.router.navigate(['/']);
      },error => {
        console.log(error);
        this.alertyfy.error(error.error);
      }
    );
    // if(token){
    //
    // }else
    // {
    //   this.alertyfy.error('User id or password is wrong');
    // }
  }
}
