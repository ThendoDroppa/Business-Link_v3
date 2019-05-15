import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-confirm-otp',
  templateUrl: './confirm-otp.component.html',
  styleUrls: ['./confirm-otp.component.css']
})
export class ConfirmOtpComponent implements OnInit {

  email: string;
  otp: number;
  sub: any;
  oid: string;
  error = '';
  success = '';

  constructor(private route: ActivatedRoute, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.oid = params['oid'];
      this.email = params['email'];
    });
  }

  onSubmit() {
    // activate(code, verificationCode, email)
    this.error = '';
    this.success = '';

    this.loginService.activate(this.email, this.oid, this.otp)
      .subscribe(
      (response: Response) => {
        if (response.status === 200) {
          if (response.json().confirmed) {
            this.success = 'Your account is activated successful.';
            console.log(this.success);
            this.router.navigateByUrl('/login');
          } else {
            this.error = 'Account not active, verify the code.';
            console.log(this.error);
          }
        } else {
          this.error = 'Error occured, please contact Droppa Team.';
        }
      },
      (err) => {
        console.log(err);
        this.error = 'Error occured, please contact Droppa Team.';
      }
      );
    // alert("OTP Code : "+this.otp +" Email:"+this.email +" oid "+this.oid);
  }
}
