import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';



import { User } from '../../models/user';
import { Login } from '../../models/login';

import { UserPortalService } from '../../services/userPortal.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  userPortalObj: any;
  users: any = [];
  companies: any = [];
  invoices: any = [];
  quotes: any = [];
  company: any;
  msg: string;
  userToken: any;
  fileSize: any;
  base64DISC: string;
  image: string = null;
  avator = 'assets\\img\\userProfile.png';
  file: any;
  loader: any;
  // assets/img/userProfile.png"

  constructor(private userPortal: UserPortalService, private route: Router) {

  }

  ngOnInit() {
    this.userPortalObj = JSON.parse(localStorage.getItem('userInfo'));
    this.userToken = JSON.parse(localStorage.getItem('userInfo')).token;
    this.userPortal.getCompanyInfor(this.userPortalObj.token, this.userPortalObj.owner.oid).subscribe(
      (res) => {
        this.companies = res;
      }
    );
    this.getProfilePicture();
  }

  public viewQuotes(company) {
    localStorage.setItem('CompanyQuote', JSON.stringify(company));
    this.route.navigateByUrl('/quotation');
  }

  public viewInvoice(company) {
    console.log(company);
    localStorage.setItem('CompanyInvoice', JSON.stringify(company));
    this.route.navigateByUrl('/invoice');
  }

  public addCompany(company) {
    localStorage.setItem('Company', JSON.stringify(company));
    this.route.navigateByUrl('/addCompany');
  }

  public getProfilePicture() {
    this.loader = true;
    this.userPortal.getProfilePic(JSON.parse(localStorage.getItem('userInfo')).owner.oid, this.userToken).subscribe(
      (res: any) => {
        this.image = res.base64Image;
        console.log(this.image);
        this.loader = false;
      }, (error) => {
        this.loader = false;
      }
    );
  }
}
