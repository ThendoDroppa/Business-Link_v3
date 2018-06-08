import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';




@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  passwordStatus: string = '';
  newPwd: string;
  sub: any;
  email: string;
  verificationCode: string;
  error: string = '';
  success: string = '';


  password: string;

  constructor(private route: ActivatedRoute, private loginService: LoginService) {

  }

  ngOnInit() {
    // this.sub = this.route.params.subscribe(params => {
    //   this.verificationCode = params['verificationCode'];
    //   this.email = params['email'];
    }

  confirmPassword(){


        this.error = '';
        this.success = '';

        var resetDetails = {
          "oid": null,
          "businessKey": null,
          "username": this.email,
          "resetToken": this.verificationCode,
          "newPwd": this.newPwd
        };

        this.loginService.resetPwd(resetDetails)
        .subscribe(
          (res :Response) => {
             if(res.status == 200) {
               this.success = 'Password reset successful, please login.';
             }else{
               this.error = 'Error occured, Contact Droppa.';
             }
          },
          (err) => {
           this.error = 'Error occured, Contact Droppa.';
          }
        )
        console.log(this.password);


      }

}
