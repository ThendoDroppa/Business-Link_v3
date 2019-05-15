import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { UserPortalService } from '../../services/userPortal.service';

@Component({
  selector: 'app-company-quotation',
  templateUrl: './company-quotation.component.html',
  styleUrls: ['./company-quotation.component.css']
})
export class CompanyQuotationComponent implements OnInit {
  company: any;
  quotes: any = [];
  companyOid: string;
  userPortalObj: any;

  constructor(private userPortal: UserPortalService, private route: Router) {}

  ngOnInit() {
    this.company = JSON.parse(localStorage.getItem('CompanyQuote'));
    this.userPortalObj =  JSON.parse(localStorage.getItem('userInfo'));
    this.comapyQuotes();
  }

  private comapyQuotes() {
    this.userPortal.getCompanyQuotes(this.userPortalObj.token, this.company.oid).subscribe(
      (res) => {
        this.quotes = res;
      }
    );
  }

  public createQuotes() {
    localStorage.setItem('CompanyQuote', JSON.stringify(this.company));
    this.route.navigateByUrl('/create');
  }

  public viewCompanyQuote(quotes) {
    localStorage.setItem('quotes', JSON.stringify(quotes));
    this.route.navigateByUrl('/view-Quote');
  }
}
