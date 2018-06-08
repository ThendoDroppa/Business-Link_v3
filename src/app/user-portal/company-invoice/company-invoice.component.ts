import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserPortalService } from '../../services/userPortal.service';

@Component({
  selector: 'app-company-invoice',
  templateUrl: './company-invoice.component.html',
  styleUrls: ['./company-invoice.component.css']
})


export class CompanyInvoiceComponent implements OnInit {

  userPortalObj: any;
  invoices: any = [];
  company: any;
  companyOid: string;

  constructor(private userPortal: UserPortalService, private route: Router) { }

  ngOnInit() {

    this.company = JSON.parse(localStorage.getItem('CompanyInvoice'));
    this.userPortalObj = JSON.parse(localStorage.getItem('userInfo'));
    this.companyInvoice();

  }


  private companyInvoice() {
    this.userPortal.getCompanInvoice(this.userPortalObj.token, this.company.oid).subscribe(
      (res) => {
        this.invoices = res;
        
      }
    )
  }

  public createInvoice() {

    localStorage.setItem('CompanyInvoice', JSON.stringify(this.company));
    this.route.navigateByUrl('/create');

  }

  public viewCompanyInvoice(invoice) {
    localStorage.setItem('invoice', JSON.stringify(invoice));
    this.route.navigateByUrl('/view-Invoie');
  }





}
