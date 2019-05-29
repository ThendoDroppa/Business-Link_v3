import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
// import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';
import { User } from '../models/user';
import { Login } from '../models/login';
import { Admin } from '../models/admin';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public passwordEye = 'glyphicon glyphicon-eye-open';
  public toggleEye = false;
  public passwordType = 'password';

  // @ViewChild('userForm') signupForm: NgForm;
  loader = false;
  firstName: string;
  lastname: string;
  email: string;
  password: string;
  contactnumber: string;
  user: User;
  login: Login;
  error: string;

  constructor(private loginService: LoginService, private route: Router) { }

  ngOnInit() {
  }

  public register() {
    // console.log('Click here');
    this.user = new User(this.lastname, this.firstName, this.email, this.contactnumber);
    this.login = new Login(this.password, this.email);
    this.user.login = this.login;

    this.loader = true;
    console.log(this.password);

    this.loginService.registerUser(this.user).subscribe(
      (response) => {
        this.error = 'Successful registration, please verify your email.';
        this.loader = false;
      },
      (error) => {
        this.error = 'Error while registering, mobile or email already exist.';
        this.loader = false;
      }
    );
  }

  showPassword() {
    this.toggleEye = !this.toggleEye;
    if (this.toggleEye) {
      this.passwordType = 'text';
      this.passwordEye = 'glyphicon glyphicon-eye-close';
    } else {
      this.passwordType = 'password';
      this.passwordEye = 'glyphicon glyphicon-eye-open';
    }
  }

  handleCorrectCaptcha(event) {}
}





