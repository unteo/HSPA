import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ObjectUnsubscribedError, Observable } from 'rxjs';
import { UserForLogin, UserForRegister } from 'src/app/model/user';
import { AlertifyService } from 'src/services/alertify.service';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
registrationForm: FormGroup;
user: UserForRegister;
userSubmitted: boolean;
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    // this.registrationForm = new FormGroup({
    //   userName: new FormControl('Mark', Validators.required),
    //   email: new FormControl(null, [Validators.required, Validators.email]),
    //   password: new FormControl(null,[Validators.required, Validators.minLength(8)]),
    //   confirmPassword: new FormControl(null,Validators.required),
    //   mobile: new FormControl(null,[Validators.required, Validators.maxLength(10)])
    // }, this.passwordMatchingValidator);
    this.createRegistrationForm();
  }

  createRegistrationForm(){
  this.registrationForm = this.fb.group(
    {
      userName : [null,Validators.required],
      email : [null, [Validators.required, Validators.email]],
      password : [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword : [null, [Validators.required]],
      mobile : [null,[Validators.required, Validators.maxLength(10)]]
    },{validators: this.passwordMatchingValidator});
  }

  passwordMatchingValidator(fg: FormGroup): Validators{
    return fg.get('password').value === fg.get('confirmPassword').value ? null : {notmatched: true};
  }

    onSubmit(){

    console.log(this.registrationForm.value);
    this.userSubmitted = true;
    if(this.registrationForm.valid){
      //this.user = Object.assign(this.user, this.registrationForm.value);
        this.authService.registeUser(this.userData()).subscribe(()=>
        {
          this.onReset();
          this.alertify.success("Congrats, youare successfully registered");
        },error => {
          console.log(error);
          this.alertify.error(error.error);
        });
       }
  }

   onReset() {
        this.userSubmitted = false;
        this.registrationForm.reset();
    }

    userData():UserForRegister {
      return this.user = {
        userName: this.userName.value,
        email: this.email.value,
        password: this.password.value,
        mobile: this.mobile.value
            }
    }


  //-----------------------------------------------
  //Getter methods for all form controls
  //---------------------------------------------
  get userName()
  {
    return this.registrationForm.get('userName') as FormControl;
  }

  get email()
  {
    return this.registrationForm.get('email') as FormControl;
  }
  get password()
  {
    return this.registrationForm.get('password') as FormControl;
  }

  get confirmPassword()
  {
    return this.registrationForm.get('confirmPassword') as FormControl;
  }
  get mobile()
  {
    return this.registrationForm.get('mobile') as FormControl;
  }

}
