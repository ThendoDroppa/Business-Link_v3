import { Component, OnInit } from '@angular/core';

import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email:string;
  error :string;
  success : string;

  constructor(private loginService : LoginService) { }

  ngOnInit() {
  }

  forgotPassword(){
    console.log(this.email);
    this.error = '';
    this.success = '';
    this.loginService.requestPwdReset(this.email)
    .subscribe(
      (res : Response) => {
        if(res.status == 200) {
          this.success = "Email sent, Check your emails for verification.";
        }
        
      },
      (err)  => {
        this.error = "Email address doesnt exist."
      }
    )
  }

}
