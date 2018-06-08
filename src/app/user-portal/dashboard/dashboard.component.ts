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


  constructor(private userPortal: UserPortalService, private route: Router) {

  }

  ngOnInit() {

    this.userPortalObj = JSON.parse(localStorage.getItem('userInfo'));
    this.userPortal.getCompanyInfor(this.userPortalObj.token, this.userPortalObj.owner.oid).subscribe(
      (res) => {
        this.companies = res;
      }
    )
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

  

}
