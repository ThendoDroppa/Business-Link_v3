import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import {Router} from '@angular/router';
import { UserLoggInService } from '../services/loggedInUser.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  password: string;
  username: string;
  errorMsg: string;
  valid: boolean;
  validAdmin: boolean;
  company: any;

  constructor(private loginService: LoginService, private route: Router, private userService: UserLoggInService) {}

  ngOnInit() {
  }

  public login() {
    console.log(this.password);
    this.errorMsg = '';
    // var pass = this.password.split('');
    this.loginService.login(this.password, this.username).subscribe(
      (response: any) => {
        response.roles.forEach( role => {
           if (role.code === 'customer') {
             localStorage.setItem('userInfo', JSON.stringify(response));
             this.valid = true;
           } else if (role.code === 'admin') {
             localStorage.setItem('userInfo', JSON.stringify(response));
             // localStorage.setItem('CompanyInvoice', JSON.stringify(response));
             this.validAdmin = true;
           }
       });

       if (this.valid) {
         this.userService.setUser(response);
         this.route.navigateByUrl('/dashboard');
       } else if (this.validAdmin) {
         this.userService.setUser(response);
         this.route.navigateByUrl('/admin');
       } else {
         window.alert('You do not have access to this site.');
       }
      },
      (err) => {
        this.errorMsg = 'Invalid username or password.';
      }
    );
  }
}
